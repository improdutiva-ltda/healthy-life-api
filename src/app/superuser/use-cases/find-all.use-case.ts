import { InjectModel } from '@nestjs/mongoose';
import { SuperuserDocument } from '../entities/superuser.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllSuperusersUseCase {
  constructor(
    @InjectModel('Superuser') private superuserModel: Model<SuperuserDocument>,
  ) {}

  async execute(): Promise<SuperuserDocument[]> {
    return await this.superuserModel.find();
  }
}
