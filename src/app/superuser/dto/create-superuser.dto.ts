import { IsEmail, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuperuserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty({ message: 'O campo role não pode estar vazio' })
  @IsIn(['personal', 'nutritionist'], { message: 'Role inválida' })
  role: string;

  @IsInt()
  registerNumber: number;

  @IsString()
  description: string;
}
