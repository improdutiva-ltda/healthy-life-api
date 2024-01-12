import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../interfaces/User.interface';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { FindUserByIdUseCase } from './find-by-id.use-case';
import { userDto } from '../dto/User.dto';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsError } from '../../errors/already-exists-error/already-exists-error';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectModel('User') private UserModel: Model<UserDocument>,
    private readonly findUserById: FindUserByIdUseCase,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const { email, ...rest } = updateUserDto;
    const existingUser = await this.findUserById.execute(id);

    if (email != existingUser.email) {
      const userEmailAlreadyExists = await this.UserModel.findOne({
        email,
      });
      if (userEmailAlreadyExists)
        throw new AlreadyExistsError('O email já existe');
    }

    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      {
        email,
        ...rest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec();
    if (!updatedUser)
      throw new NotFoundError('Erro ao atualizar informações do usuário');

    return userDto(updatedUser);
  }
}
