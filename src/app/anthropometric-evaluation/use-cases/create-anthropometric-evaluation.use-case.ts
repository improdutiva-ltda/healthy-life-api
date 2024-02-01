import { BadRequestError } from './../../errors/bad-request-error/bad-request-error';
import { AlreadyExistsError } from './../../errors/already-exists-error/already-exists-error';
import { FindSuperuserByIdUseCase } from './../../superuser/use-cases/find-by-id.use-case';
import { NotFoundError } from './../../errors/not-found-error/not-found-error';
import { FindUserByIdUseCase } from './../../user/use-cases/find-by-id.use-case';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnthropometricEvaluationDto } from '../dto/create-anthropometric-evaluation.dto';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';
import { ValidationEvaluationFieldsService } from '../helpers/field-validation.helper';
import { anthropometricEvaluationDto } from '../helpers/anthropometric-evaluation.dto';
import { CreateAnthropometricEvaluationResponse } from '../interfaces/anthropometric-evaluation-response.interface';

export class CreateAnthropometricEvaluationUseCase {
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
    if (evaluationAlreadyExists)
      throw new AlreadyExistsError(
        'Avalição antropométrica já cadastrada! Adicione avaliações no usuário cadastrado.',
      );

    const data = { ...anthropometricEvaluation, admin: adminAlreadyExists.id };
    const anthropEvaluation = await this.anthropEvaluationModel.create({
      user: userAlreadyExists.id,
      anthropometricEvaluation: data,
    });

    if (!anthropEvaluation)
      throw new BadRequestError('Erro ao criar avaliação antropométrica');

    return anthropometricEvaluationDto(anthropEvaluation);
  }
}
