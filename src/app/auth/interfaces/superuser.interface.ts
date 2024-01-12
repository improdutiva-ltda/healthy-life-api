import { ISuperuser } from '../../superuser/interfaces/superuser.interface';

export type SuperuserSignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: Pick<ISuperuser, 'id' | 'name' | 'role' | 'roleId'>;
};

export type SuperuserSignUpResponse = Omit<
  SuperuserSignInResponse,
  'accessToken'
>;
