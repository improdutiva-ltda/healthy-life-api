import { NotFoundError } from '../../errors/not-found-error/not-found-error';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';

export class DeleteAnthropometricEvaluationByEvaluationIdUseCase {
  constructor(
    @InjectModel('AnthropometricEvaluation')
    private anthropEvaluationModel: Model<AnthropometricEvaluationDocument>,
  ) {}

  async execute(userId: string, evaluationId: string): Promise<any> {
    const evaluation = await this.anthropEvaluationModel.findOneAndUpdate(
      { user: userId, 'anthropometricEvaluation._id': evaluationId },
      { $pull: { anthropometricEvaluation: { _id: evaluationId } } },
      { new: true },
    );
    if (!evaluation)
      throw new NotFoundError(
        'Avaliação Antropométrica com o id fornecido não existe',
      );

    return {
      success: true,
      message: 'Avaliação Antropométrica específica removida.',
    };
  }
}
