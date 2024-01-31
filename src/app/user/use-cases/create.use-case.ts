import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsError } from '../../errors/already-exists-error/already-exists-error';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';
import { UserDocument } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindSuperuserByIdUseCase } from '../../superuser/use-cases/find-by-id.use-case';
import { userDto } from '../dto/user.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly findSuperuserByIdService: FindSuperuserByIdUseCase,
  ) {}

  async execute(
    superuserId: string,
    createUserDto: CreateUserDto,
  ): Promise<IUser> {
    const { email, ...rest } = createUserDto;

    const userEmailAlreadyExists = await this.userModel.findOne({ email });
    if (userEmailAlreadyExists)
      throw new AlreadyExistsError('O email já existe');

    const { user } = await this.findSuperuserByIdService.execute(superuserId);

    const createdUser = await this.userModel.create({
      superUsers: user,
      email,
      ...rest,
    });
    if (!createdUser) throw new NotFoundError('Erro ao criar usuário');

    return userDto(createdUser);
  }
}
