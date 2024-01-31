import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import { userDto } from '../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async execute(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundError('Usuário não encontrado');

    return userDto(user);
  }
}
