import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateAnthropometricEvaluationDto {
  @IsNumber({}, { message: 'Nível de Atividade Física (NAF) é obrigatório' })
  physicalActivityLevel: number;

  @IsNumber({}, { message: 'Peso Atual é um campo obrigatório.' })
  @Min(0, { message: 'O Peso Atual precisa ser maior que 0' })
  currentWeight: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Circuferência Abdominal precisa ser maior que 0' })
  circumferenceAbdominal: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  circumferenceWaist: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  circumferenceArm: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  circumferenceCalf: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  circumferenceHip: number;

  @IsNumber()
  @Min(0)
  skinfoldBiceps: number;

  @IsNumber({}, { message: 'Dobra cultânea tricipal é um campo obrigatório.' })
  @Min(0)
  tricepsSkinfold: number;

  @IsNumber(
    {},
    { message: 'Dobra cultânea subescapular é um campo obrigatório.' },
  )
  @Min(0)
  skinfoldSubscapular: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skinfoldMediumAxillary: number;

  @IsNumber(
    {},
    { message: 'Dobra cultânea suprailíaca é um campo obrigatório.' },
  )
  @Min(0)
  suprailiacSkinfold: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skinfoldSupraspinal: number;

  @IsNumber({}, { message: 'Dobra cultânea abdominal é um campo obrigatório.' })
  @Min(0)
  abdominalSkinfold: number;

  @IsNumber({}, { message: 'Dobra cultânea da coxa é um campo obrigatório.' })
  @Min(0)
  thighSkinfold: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  skinfoldCalf: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  skinfoldBreastplate: number;
}
