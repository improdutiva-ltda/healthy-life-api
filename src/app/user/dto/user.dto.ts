import { UserDocument } from '../entities/user.entity';
import { IUser, ListUsersServiceResponse } from '../interfaces/user.interface';

export const userDto = (user: UserDocument): IUser => ({
  id: user.id,
  superUser: user.superUser.map((superuser) => ({
    id: superuser.id,
    email: superuser.email,
    roleId: superuser.roleId,
    role: superuser.role,
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
  param: UserDocument[],
  totalPages: number,
): ListUsersServiceResponse => ({
  users: param.map((user) => ({
    id: user.id,
    superUser: user.superUser.map((superuser) => ({
      id: superuser.id,
      email: superuser.email,
      roleId: superuser.roleId,
      role: superuser.role,
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
  totalPages: totalPages,
});
