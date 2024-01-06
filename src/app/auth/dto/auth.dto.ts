import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
