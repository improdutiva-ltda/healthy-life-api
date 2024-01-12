import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsIn(['registered', 'accompaniment', 'pending', 'inactive'], {
    message: 'Status inválido',
  })
  @IsNotEmpty()
  status: string;

  @IsNotEmpty({ message: 'O campo endereço não pode ser vazio' })
  address: string;

  @IsDateString()
  paymentDate: Date;

  @IsIn(['inPerson', 'online'], { message: 'Tipo de acompanhamento inválido' })
  @IsNotEmpty()
  typeFollowUp: string;
}
