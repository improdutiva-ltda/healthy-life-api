import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperuserDto } from './create-superuser.dto';

export class UpdateSuperuserDto extends PartialType(CreateSuperuserDto) {
  refreshToken?: string;
}
