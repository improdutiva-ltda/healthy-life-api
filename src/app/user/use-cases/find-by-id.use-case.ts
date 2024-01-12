import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';
import { IUser } from '../interfaces/user.interface';
import { userDto } from '../dto/user.dto';

@Injectable()
export class FindUserByIdUseCase {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async execute(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundError('Usuário não encontrado');

    return userDto(user);
  }
}
