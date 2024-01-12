import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperuserDocument } from '../../superuser/entities/superuser.entity';
import { Injectable } from '@nestjs/common';
import { ArgonAdapterService } from '../../../infra/argon-adapter/argon-adapter.service';
import { checkSuperuserRole } from '../../superuser/utils/verify-superuser-role';
import { CreateSuperuserDto } from '../dto/create-superuser.dto';
import { AlreadyExistsError } from '../../errors/already-exists-error/already-exists-error';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';

@Injectable()
export class CreateSuperuserUseCase {
  constructor(
    @InjectModel('Superuser') private superuserModel: Model<SuperuserDocument>,
    private readonly argon: ArgonAdapterService,
  ) {}

  async execute(
    createSuperuserDto: CreateSuperuserDto,
  ): Promise<SuperuserDocument> {
    const { email, password, registerNumber, role, ...rest } =
      createSuperuserDto;

    const userEmailAlreadyExists = await this.superuserModel.findOne({ email });
    if (userEmailAlreadyExists)
      throw new AlreadyExistsError('O email já existe');

    const userRegisterNumberAlreadyExists = await this.superuserModel.findOne({
      registerNumber,
    });
    if (userRegisterNumberAlreadyExists)
      throw new AlreadyExistsError('Número de registro já existe');

    const roleId = checkSuperuserRole(role);
    const hashedPassword = await this.argon.hash(password);

    const createdUser = await this.superuserModel.create({
      roleId,
      role,
      email,
      registerNumber,
      password: hashedPassword,
      refresh_token: '',
      ...rest,
    });
    if (!createdUser) throw new NotFoundError('Erro ao criar usuário');

    return createdUser;
  }
}
