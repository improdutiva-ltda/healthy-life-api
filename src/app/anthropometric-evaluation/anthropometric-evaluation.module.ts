import { Module } from '@nestjs/common';

import { AnthropometricEvaluationController } from './anthropometric-evaluation.controller';
import { CreateAnthropometricEvaluationUseCase } from './use-cases/create-anthropometric-evaluation.use-case';
import {
  AnthropometricEvaluation,
  AnthropometricEvaluationSchema,
} from './entities/user-anthropometric-evaluation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { SuperuserModule } from '../superuser/superuser.module';
import { ValidationEvaluationFieldsService } from './helpers/field-validation.helper';
import { DeleteAnthropometricEvaluationByEvaluationIdUseCase } from './use-cases/delete-by-evaluation-id.use-case';
import { UpdateAnthropometricEvaluationUseCase } from './use-cases/update.use-case';
import { AddAnthropometricEvaluationUseCase } from './use-cases/add-anthrop-evaluation.use-case';
import { GetAnthropometricEvaluationByUserIdUseCase } from './use-cases/get-anthop-evaluation-by-user.use-case';
import { DeleteAnthropometricEvaluationByUserIdUseCase } from './use-cases/delete-by-user-id.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AnthropometricEvaluation.name,
        schema: AnthropometricEvaluationSchema,
      },
    ]),
    UserModule,
    SuperuserModule,
  ],
  controllers: [AnthropometricEvaluationController],
  providers: [
    CreateAnthropometricEvaluationUseCase,
    DeleteAnthropometricEvaluationByEvaluationIdUseCase,
    DeleteAnthropometricEvaluationByUserIdUseCase,
    UpdateAnthropometricEvaluationUseCase,
    AddAnthropometricEvaluationUseCase,
    GetAnthropometricEvaluationByUserIdUseCase,
    ValidationEvaluationFieldsService,
  ],
})
export class AnthropometricEvaluationModule {}
