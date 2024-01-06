import { InjectModel } from '@nestjs/mongoose';
import { UpdateSuperuserDto } from '../dto/update-superuser.dto';
import { IUpdateSuperuserResponse } from '../interfaces/superuser.interface';
import { Model } from 'mongoose';
import { SuperuserDocument } from '../entities/superuser.entity';
import { FindSuperuserByIdUseCase } from './find-by-id.use-case';
import { createSuperuserDtoResponse } from '../dto/superuser.dto';
import { checkSuperuserRole } from '../utils/verify-superuser-role';
import { Injectable } from '@nestjs/common';
import { ArgonAdapterService } from 'src/infra/argon-adapter/argon-adapter.service';
import { AlreadyExistsError } from 'src/app/errors/already-exists-error/already-exists-error';
import { NotFoundError } from 'src/app/errors/not-found-error/not-found-error';

@Injectable()
export class UpdateSuperuserUseCase {
  constructor(
    @InjectModel('Superuser') private superuserModel: Model<SuperuserDocument>,
    private readonly findSuperuserById: FindSuperuserByIdUseCase,
    private readonly argon: ArgonAdapterService,
  ) {}

  async execute(
    id: string,
    updateSuperuserDto: UpdateSuperuserDto,
  ): Promise<IUpdateSuperuserResponse> {
    const {
      registerNumber,
      refreshToken,
      password,
      email,
      role,
      name,
      phone,
      description,
    } = updateSuperuserDto;
    const { user: existingUser } = await this.findSuperuserById.execute(id);

    if (email != existingUser.email) {
      const userEmailAlreadyExists = await this.superuserModel.findOne({
        email,
      });
      if (userEmailAlreadyExists)
        throw new AlreadyExistsError('O email já existe');
    }

    if (registerNumber != existingUser.registerNumber) {
      const userRegisterNumberAlreadyExists = await this.superuserModel.findOne(
        {
          registerNumber,
        },
      );
      if (userRegisterNumberAlreadyExists)
        throw new AlreadyExistsError('Número de registro já existe');
    }

    let roleId: number;
    let hashedPassword: string;

    if (role) roleId = checkSuperuserRole(role);
    if (password) hashedPassword = await this.argon.hash(password);

    const updatedUser = await this.superuserModel
      .findByIdAndUpdate(
        id,
        {
          roleId,
          role,
          password: hashedPassword,
          registerNumber,
          email,
          updatedAt: new Date(),
          name,
          phone,
          description,
          refresh_token: refreshToken,
        },
        { new: true, runValidators: true },
      )
      .exec();
    if (!updatedUser)
      throw new NotFoundError('Erro ao atualizar informações do usuário');

    return createSuperuserDtoResponse(updatedUser);
  }
}
