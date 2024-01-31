import { SuperuserDocument } from './../../superuser/entities/superuser.entity';

type ISuperuser = Pick<SuperuserDocument, 'id'>;

export type IUser = {
  id: string;
  superUsers: ISuperuser[];
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
  docs: IUser[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
};

export type RemoveUserServiceResponse = {
  id: string;
  success: boolean;
  message: string;
};
