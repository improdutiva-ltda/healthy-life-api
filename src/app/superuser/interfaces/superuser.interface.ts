import { Types } from 'mongoose';

export type ISuperuser = {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  registerNumber: number;
  role: string;
  roleId: number;
  description: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ISuperuserResponse = {
  user: ISuperuser;
};

export type IUpdateSuperuserResponse = {
  user: Omit<ISuperuser, 'password'>;
};
