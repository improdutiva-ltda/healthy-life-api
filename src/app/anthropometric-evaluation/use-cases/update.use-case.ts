import { BadRequestError } from './../../errors/bad-request-error/bad-request-error';
import { NotFoundError } from './../../errors/not-found-error/not-found-error';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';
import { anthropometricEvaluationDto } from '../helpers/anthropometric-evaluation.dto';
import { ValidationEvaluationFieldsService } from '../helpers/field-validation.helper';
import { CreateAnthropometricEvaluationResponse } from '../interfaces/anthropometric-evaluation-response.interface';
import { UpdateAnthropometricEvaluationDto } from '../dto/update-anthropometric-evaluation.dto';

export class UpdateAnthropometricEvaluationUseCase {
  constructor(
    @InjectModel('AnthropometricEvaluation')
    private anthropEvaluationModel: Model<AnthropometricEvaluationDocument>,
    private readonly validationsService: ValidationEvaluationFieldsService,
  ) {}

  async execute(
    userId: string,
    evaluationId: string,
    anthropometricEvaluation: UpdateAnthropometricEvaluationDto,
  ): Promise<CreateAnthropometricEvaluationResponse> {
    const anthropometricEvaluations = await this.anthropEvaluationModel.findOne(
      { user: userId, 'anthropometricEvaluation._id': evaluationId },
    );
    if (!anthropometricEvaluations)
      throw new NotFoundError('Avaliação antropométrica não encontrada');

    this.validationsService.validate(anthropometricEvaluation);

    const admin = anthropometricEvaluations.anthropometricEvaluation[0].admin;

    const anthropEvaluation =
      await this.anthropEvaluationModel.findOneAndUpdate(
        {
          user: userId,
          'anthropometricEvaluation._id': evaluationId,
        },
        {
          $set: {
            'anthropometricEvaluation.$': {
              _id: evaluationId,
              admin,
              ...anthropometricEvaluation,
            },
          },
        },
        { new: true },
      );

    if (!anthropEvaluation)
      throw new BadRequestError('Erro ao atualizar avaliação antropométrica');

    return anthropometricEvaluationDto(anthropEvaluation);
  }
}
