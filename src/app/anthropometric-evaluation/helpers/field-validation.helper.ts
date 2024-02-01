import { UpdateAnthropometricEvaluationDto } from '../dto/update-anthropometric-evaluation.dto';
import { BadRequestError } from './../../errors/bad-request-error/bad-request-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationEvaluationFieldsService {
  validate({
    physicalActivityLevel,
    abdominalSkinfold,
    thighSkinfold,
    skinfoldSubscapular,
    suprailiacSkinfold,
    tricepsSkinfold,
    currentWeight,
  }: UpdateAnthropometricEvaluationDto): void {
    const errors = [];
    const params = [
      physicalActivityLevel,
      abdominalSkinfold,
      thighSkinfold,
      skinfoldSubscapular,
      suprailiacSkinfold,
      tricepsSkinfold,
      currentWeight,
    ];
    const messages = [
      'Nível de Atividade Física (NAF) é obrigatório',
      'Dobra cultânea abdominal é um campo obrigatório.',
      'Dobra cultânea da coxa é um campo obrigatório.',
      'Dobra cultânea subescapular é um campo obrigatório.',
      'Dobra cultânea suprailíaca é um campo obrigatório.',
      'Dobra cultânea tricipal é um campo obrigatório.',
      'Peso atual é um campo obrigatório.',
    ];
    for (let i = 0; i < params.length; i++) {
      if (!params[i]) {
        errors.push({
          message: messages[i],
        });
      }
    }

    if (errors.length > 0) throw new BadRequestError(errors[0].message);
  }
}
