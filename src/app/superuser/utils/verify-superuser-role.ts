import { SuperuserRole, SuperuserRoleId } from '../entities/role.enum';

export const checkSuperuserRole = (role: string): number => {
  if (role.toLowerCase() == SuperuserRole.PERSONAL) {
    return SuperuserRoleId.PERSONAL;
  }
  return SuperuserRoleId.NUTRITIONIST;
};
