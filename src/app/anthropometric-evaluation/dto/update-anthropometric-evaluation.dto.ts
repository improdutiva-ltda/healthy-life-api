import { PartialType } from '@nestjs/swagger';
import { CreateAnthropometricEvaluationDto } from './create-anthropometric-evaluation.dto';

export class UpdateAnthropometricEvaluationDto extends PartialType(
  CreateAnthropometricEvaluationDto,
) {}
