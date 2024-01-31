import { NotFoundError } from './../../errors/not-found-error/not-found-error';
import { FindUserByIdUseCase } from './../../user/use-cases/find-by-id.use-case';
import { InjectModel } from '@nestjs/mongoose';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';
import { allAnthropometricsEvaluationDto } from '../helpers/anthropometric-evaluation.dto';
import { Model } from 'mongoose';

export class GetAnthropometricEvaluationByUserIdUseCase {
  constructor(
    @InjectModel('AnthropometricEvaluation')
    private anthropEvaluationModel: Model<AnthropometricEvaluationDocument>,
    private readonly findUserById: FindUserByIdUseCase,
  ) {}
  async execute(userId: string): Promise<any> {
    const user = await this.findUserById.execute(userId);
    if (!user) throw new NotFoundError('Usuário não encontrado');

    const anthropometricEvaluations = await this.anthropEvaluationModel.findOne(
      { user: userId },
    );
    if (!anthropometricEvaluations)
      throw new NotFoundError(
        'Usuário fornecido não possui avaliação antropométrica',
      );

    return allAnthropometricsEvaluationDto(anthropometricEvaluations);
  }
}
