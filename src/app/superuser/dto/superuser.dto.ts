import { SuperuserDocument } from '../entities/superuser.entity';

export const superuserDto = (user: SuperuserDocument) => ({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone,
    registerNumber: user.registerNumber,
    role: user.role,
    roleId: user.roleId,
    description: user.description,
    refreshToken: user.refresh_token,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  },
});

export const createSuperuserDtoResponse = (user: SuperuserDocument) => ({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    registerNumber: user.registerNumber,
    role: user.role,
    roleId: user.roleId,
    description: user.description,
    refreshToken: user.refresh_token,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  },
});
