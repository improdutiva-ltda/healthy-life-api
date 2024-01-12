import { ISuperuserResponse } from '../interfaces/superuser.interface';
import { superuserDto } from '../dto/superuser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperuserDocument } from '../entities/superuser.entity';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../errors/not-found-error/not-found-error';

@Injectable()
export class FindSuperuserByIdUseCase {
  constructor(
    @InjectModel('Superuser') private superuserModel: Model<SuperuserDocument>,
  ) {}

  async execute(id: string): Promise<ISuperuserResponse> {
    const user = await this.superuserModel.findById(id);
    if (!user) throw new NotFoundError('Usuário não encontrado');

    return superuserDto(user);
  }
}
