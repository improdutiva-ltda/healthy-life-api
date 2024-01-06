import { InjectModel } from '@nestjs/mongoose';
import { SuperuserDocument } from '../entities/superuser.entity';
import { Model } from 'mongoose';
import { FindSuperuserByIdUseCase } from './find-by-id.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveSuperuserByIdUseCase {
  constructor(
    @InjectModel('Superuser') private superuserModel: Model<SuperuserDocument>,
    private readonly findSuperuserById: FindSuperuserByIdUseCase,
  ) {}

  async execute(id: string): Promise<SuperuserDocument> {
    await this.findSuperuserById.execute(id);

    return await this.superuserModel.findOneAndDelete({ _id: id });
  }
}
