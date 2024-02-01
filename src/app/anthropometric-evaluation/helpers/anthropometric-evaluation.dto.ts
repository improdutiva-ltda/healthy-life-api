import {
  CreateAnthropometricEvaluationResponse,
  UserAnthropometricEvaluationResponse,
} from '../interfaces/anthropometric-evaluation-response.interface';
import { AnthropometricEvaluationDocument } from '../entities/user-anthropometric-evaluation.entity';

export const anthropometricEvaluationDto = (
  data: AnthropometricEvaluationDocument,
): CreateAnthropometricEvaluationResponse => {
  const anthropometricEvaluation =
    data.anthropometricEvaluation[data.anthropometricEvaluation.length - 1];

  return {
    id: data.id,
    user: data.user,
    anthropometricEvaluation: anthropometricEvaluation
      ? basicAnthropEvalDto(anthropometricEvaluation)
      : null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const allAnthropometricsEvaluationDto = (
  data: AnthropometricEvaluationDocument,
): UserAnthropometricEvaluationResponse => ({
  id: data.id.toString(),
  user: data.user.toString(),
  anthropometricEvaluation: data.anthropometricEvaluation.map((anthropEval) =>
    basicAnthropEvalDto(anthropEval),
  ),
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

const basicAnthropEvalDto = (anthropometricEvaluation: any) => ({
  id: anthropometricEvaluation.id,
  admin: anthropometricEvaluation.admin,
  physicalActivityLevel: anthropometricEvaluation.physicalActivityLevel,
  currentWeight: anthropometricEvaluation.currentWeight,

  circumferenceAbdominal: anthropometricEvaluation.circumferenceAbdominal,
  circumferenceWaist: anthropometricEvaluation.circumferenceWaist,
  circumferenceArm: anthropometricEvaluation.circumferenceArm,
  circumferenceCalf: anthropometricEvaluation.circumferenceCalf,
  circumferenceHip: anthropometricEvaluation.circumferenceHip,

  skinfoldBiceps: anthropometricEvaluation.skinfoldBiceps,
  tricepsSkinfold: anthropometricEvaluation.tricepsSkinfold,
  skinfoldSubscapular: anthropometricEvaluation.skinfoldSubscapular,
  skinfoldMediumAxillary: anthropometricEvaluation.skinfoldMediumAxillary,
  suprailiacSkinfold: anthropometricEvaluation.suprailiacSkinfold,
  supraspinalSkinfold: anthropometricEvaluation.supraspinalSkinfold,
  abdominalSkinfold: anthropometricEvaluation.abdominalSkinfold,
  thighSkinfold: anthropometricEvaluation.thighSkinfold,
  skinfoldCalf: anthropometricEvaluation.skinfoldCalf,
  skinfoldBreastplate: anthropometricEvaluation.skinfoldBreastplate,

  createdAt: anthropometricEvaluation.createdAt,
  updatedAt: anthropometricEvaluation.updatedAt,
});
