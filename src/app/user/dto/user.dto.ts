import { PaginateResult } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { IUser, ListUsersServiceResponse } from '../interfaces/user.interface';

export const userDto = (user: UserDocument): IUser => ({
  id: user.id,
  superUsers: user.superUsers.map((superuser) => ({
    id: superuser.id,
  })),
  name: user.name,
  email: user.email,
  phone: user.phone,
  status: user.status,
  address: user.address,
  paymentDate: user.paymentDate,
  typeFollowUp: user.typeFollowUp,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const userToPaginationDto = (
  data: PaginateResult<UserDocument>,
): ListUsersServiceResponse => ({
  docs: data.docs.map((user) => ({
    id: user.id,
    superUsers: user.superUsers.map((superuser) => ({
      id: superuser.id,
    })),
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.status,
    address: user.address,
    paymentDate: user.paymentDate,
    typeFollowUp: user.typeFollowUp,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })),
  totalDocs: data.docs.length,
  limit: data.limit,
  totalPages: data.totalPages,
  page: data.page,
  pagingCounter: data.pagingCounter,
  hasPrevPage: data.hasPrevPage,
  hasNextPage: data.hasNextPage,
  prevPage: data.prevPage,
  nextPage: data.nextPage,
});
// export const userToPaginationDto = (
//   data: PaginateResult<AnthropometricEvaluationDocument>,
// ): ResultAnthropometricEvaluationToPagination => ({
//   docs: data.docs.map((value) => ({
//     id: value.id.toString(),
//     user: value.user.toString(),
//     anthropometricEvaluation: value.anthropometricEvaluation.map(
//       (anthropEval) => basicAnthropEvalDto(anthropEval),
//     ),
//     createdAt: value.createdAt,
//     updatedAt: value.updatedAt,
//   })),
//   totalDocs: data.docs.length,
//   limit: data.limit,
//   totalPages: data.totalPages,
//   page: data.page,
//   pagingCounter: data.pagingCounter,
//   hasPrevPage: data.hasPrevPage,
//   hasNextPage: data.hasNextPage,
//   prevPage: data.prevPage,
//   nextPage: data.nextPage,
// });
