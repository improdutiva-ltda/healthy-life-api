import { NotFoundError } from '../../errors/not-found-error/not-found-error';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';

export class DeleteAnthropometricEvaluationByUserIdUseCase {
  constructor(
    @InjectModel('AnthropometricEvaluation')
    private anthropEvaluationModel: Model<AnthropometricEvaluationDocument>,
  ) {}

  async execute(userId: string): Promise<any> {
    const evaluation = await this.anthropEvaluationModel.findOneAndDelete({
      user: userId,
    });

    if (!evaluation)
      throw new NotFoundError(
        'Avaliação Antropométrica com o id fornecido não existe',
      );

    return {
      success: true,
      message: 'Avaliação Antropométrica do usuário removida.',
    };
  }
}
