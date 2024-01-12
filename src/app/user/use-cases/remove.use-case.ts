import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import { FindUserByIdUseCase } from './find-by-id.use-case';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RemoveUserServiceResponse } from '../interfaces/user.interface';

@Injectable()
export class RemoveUserByIdUseCase {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly findUserById: FindUserByIdUseCase,
  ) {}

  async execute(id: string): Promise<RemoveUserServiceResponse> {
    await this.findUserById.execute(id);

    const user = await this.userModel.findOneAndDelete({ _id: id });
    if (!user) throw new BadRequestException('Erro ao deletar usuário');

    return {
      id: user.id,
      message: 'Usuário deletado com sucesso',
      success: true,
    };
  }
}
