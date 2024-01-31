import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateAnthropometricEvaluationDto } from './dto/create-anthropometric-evaluation.dto';
import { UpdateAnthropometricEvaluationDto } from './dto/update-anthropometric-evaluation.dto';
import { CreateAnthropometricEvaluationUseCase } from './use-cases/create-anthropometric-evaluation.use-case';
import { DeleteAnthropometricEvaluationByEvaluationIdUseCase } from './use-cases/delete-by-evaluation-id.use-case';
import { UpdateAnthropometricEvaluationUseCase } from './use-cases/update.use-case';
import { AddAnthropometricEvaluationUseCase } from './use-cases/add-anthrop-evaluation.use-case';
import { GetAnthropometricEvaluationByUserIdUseCase } from './use-cases/get-anthop-evaluation-by-user.use-case';
import { DeleteAnthropometricEvaluationByUserIdUseCase } from './use-cases/delete-by-user-id.use-case';

@Controller('anthropometric-evaluation')
export class AnthropometricEvaluationController {
  constructor(
    private readonly createAnthropEvaluation: CreateAnthropometricEvaluationUseCase,
    private readonly deleteAnthropEvaluation: DeleteAnthropometricEvaluationByEvaluationIdUseCase,
    private readonly updateAnthropEvaluation: UpdateAnthropometricEvaluationUseCase,
    private readonly addAnthropEvaluation: AddAnthropometricEvaluationUseCase,
    private readonly getAnthropEvaluationByUserId: GetAnthropometricEvaluationByUserIdUseCase,
    private readonly deleteAnthropEvaluationByUserId: DeleteAnthropometricEvaluationByUserIdUseCase,
  ) {}

  @Post(':adminId')
  async create(
    @Param('adminId') adminId: string,
    @Query('userId') userId: string,
    @Body()
    createAnthropometricEvaluationDto: CreateAnthropometricEvaluationDto,
  ) {
    return await this.createAnthropEvaluation.execute(
      adminId,
      userId,
      createAnthropometricEvaluationDto,
    );
  }

  @Post('add/:adminId')
  async add(
    @Param('adminId') adminId: string,
    @Query('userId') userId: string,
    @Body()
    createAnthropometricEvaluationDto: CreateAnthropometricEvaluationDto,
  ) {
    return await this.addAnthropEvaluation.execute(
      adminId,
      userId,
      createAnthropometricEvaluationDto,
    );
  }

  @Get('/by-user/:userId')
  async getAnthropometricEvaluationByUser(@Param('userId') userId: string) {
    return await this.getAnthropEvaluationByUserId.execute(userId);
  }

  @Patch(':userId/:evaluationId')
  async update(
    @Param('userId') userId: string,
    @Param('evaluationId') evaluationId: string,
    @Body()
    updateAnthropometricEvaluationDto: UpdateAnthropometricEvaluationDto,
  ) {
    return await this.updateAnthropEvaluation.execute(
      userId,
      evaluationId,
      updateAnthropometricEvaluationDto,
    );
  }

  @Delete(':userId/:evaluationId')
  async removeByEvaluationId(
    @Param('userId') userId: string,
    @Param('evaluationId') evaluationId: string,
  ) {
    return await this.deleteAnthropEvaluation.execute(userId, evaluationId);
  }

  @Delete('/by-user/:userId')
  async removeByUserId(@Param('userId') userId: string) {
    return await this.deleteAnthropEvaluationByUserId.execute(userId);
  }
}
