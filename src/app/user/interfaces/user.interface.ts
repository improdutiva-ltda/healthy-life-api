import { SuperuserDocument } from './../../superuser/entities/superuser.entity';

type ISuperuser = Pick<SuperuserDocument, 'id' | 'email' | 'role' | 'roleId'>;

export type IUser = {
  id: string;
  superUser: ISuperuser[];
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  typeFollowUp: string;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ListUsersServiceResponse = {
  users: IUser[];
  totalPages: number;
};

export type RemoveUserServiceResponse = {
  id: string;
  success: boolean;
  message: string;
};
