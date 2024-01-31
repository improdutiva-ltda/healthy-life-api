import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SuperuserDocument } from '../entities/superuser.entity';
import { ISuperuserResponse } from '../interfaces/superuser.interface';
import { superuserDto } from '../dto/superuser.dto';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';

@Injectable()
export class GetSuperuserByEmailUseCase {
  constructor(
    @InjectModel('Superuser') private superuserModel: Model<SuperuserDocument>,
  ) {}

  async execute(email: string): Promise<ISuperuserResponse> {
    const user = await this.superuserModel.findOne({ email });
    if (!user) throw new NotFoundError('Usuário não encontrado');

    return superuserDto(user);
  }
}
