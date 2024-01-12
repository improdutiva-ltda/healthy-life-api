import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { userToPaginationDto } from '../dto/user.dto';
import { ListUsersServiceResponse } from '../interfaces/user.interface';

@Injectable()
export class FindAllUsersUseCase {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async execute(
    queryParams: any,
    page: number,
    limit: number,
  ): Promise<ListUsersServiceResponse> {
    const queries = this.handleQuery(queryParams);

    const count = await this.userModel.countDocuments(queries).exec();
    const totalPages = Math.floor((count - 1) / limit) + 1;

    if (page <= 0) page = 1;
    const skip = limit * (page - 1);

    const users = await this.userModel
      .find(queries)
      .limit(limit)
      .skip(skip)
      .exec();

    return userToPaginationDto(users, totalPages);
  }

  handleQuery(queryParams: any) {
    const queries = {};
    const params: any = { ...queryParams };

    for (const key of Object.keys(queryParams)) {
      if (params[key]) {
        queries[key] = params[key];
      }
    }

    return queries;
  }
}
