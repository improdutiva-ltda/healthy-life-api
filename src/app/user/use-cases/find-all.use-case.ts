import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../entities/user.entity';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { userToPaginationDto } from '../dto/user.dto';
import { ListUsersServiceResponse } from '../interfaces/user.interface';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @InjectModel('User') private userModel: PaginateModel<UserDocument>,
  ) {}

  async execute(
    queryParams: any,
    page: number,
    limit: number,
  ): Promise<ListUsersServiceResponse> {
    if (page <= 0 || page > 15) page = 1;
    const query = this.handleQuery(queryParams);

    const options = { page, limit };
    const users = await this.userModel.paginate(query, options);

    return userToPaginationDto(users);
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
