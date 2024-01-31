import { BadRequestError } from './../../errors/bad-request-error/bad-request-error';
import { FindSuperuserByIdUseCase } from './../../superuser/use-cases/find-by-id.use-case';
import { FindUserByIdUseCase } from './../../user/use-cases/find-by-id.use-case';
import { NotFoundError } from './../../errors/not-found-error/not-found-error';
import { anthropometricEvaluationDto } from '../helpers/anthropometric-evaluation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';
import { ValidationEvaluationFieldsService } from '../helpers/field-validation.helper';
import { CreateAnthropometricEvaluationResponse } from '../interfaces/anthropometric-evaluation-response.interface';
import { CreateAnthropometricEvaluationDto } from '../dto/create-anthropometric-evaluation.dto';

export class AddAnthropometricEvaluationUseCase {
  constructor(
    @InjectModel('AnthropometricEvaluation')
    private anthropEvaluationModel: Model<AnthropometricEvaluationDocument>,
    private readonly validationsService: ValidationEvaluationFieldsService,
    private readonly findUserById: FindUserByIdUseCase,
    private readonly findSuperUserById: FindSuperuserByIdUseCase,
  ) {}

  async execute(
    adminId: string,
    userId: string,
    anthropometricEvaluation: CreateAnthropometricEvaluationDto,
  ): Promise<CreateAnthropometricEvaluationResponse> {
    const userAlreadyExists = await this.findUserById.execute(userId);
    if (!userAlreadyExists) throw new NotFoundError('Usuário não encontrado');

    const { user: adminAlreadyExists } = await this.findSuperUserById.execute(
      adminId,
    );
    if (!adminAlreadyExists) throw new NotFoundError('Usuário não encontrado');

    const evaluationAlreadyExists = await this.anthropEvaluationModel.findOne({
      user: userId,
    });
    if (!evaluationAlreadyExists)
      throw new NotFoundError(
        'Este usuário não possui avalição antropométrica cadastrada! Por favor, crie uma nova avaliação para o usuário.',
      );

    const data = { ...anthropometricEvaluation, admin: adminAlreadyExists.id };
    const addAnthropEvaluation =
      await this.anthropEvaluationModel.findOneAndUpdate(
        { user: userId },
        { $push: { anthropometricEvaluation: data } },
        { new: true },
      );

    if (!addAnthropEvaluation)
      throw new BadRequestError('Erro ao adicionar avaliação antropométrica');

    return anthropometricEvaluationDto(addAnthropEvaluation);
  }
}
