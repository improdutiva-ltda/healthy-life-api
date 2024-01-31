export type BasicAnthropometricEvaluation = {
  id: string;
  admin: string;
  physicalActivityLevel: number;
  currentWeight: number;

  circumferenceAbdominal: number;
  circumferenceWaist: number;
  circumferenceArm: number;
  circumferenceCalf: number;
  circumferenceHip: number;

  skinfoldBiceps: number;
  tricepsSkinfold: number;
  skinfoldSubscapular: number;
  skinfoldMediumAxillary: number;
  suprailiacSkinfold: number;
  supraspinalSkinfold: number;
  abdominalSkinfold: number;
  thighSkinfold: number;
  skinfoldCalf: number;
  skinfoldBreastplate: number;

  createdAt: Date;
  updatedAt: Date;
};

export type CreateAnthropometricEvaluationResponse = {
  id: string;
  user: string;
  anthropometricEvaluation: BasicAnthropometricEvaluation;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAnthropometricEvaluationResponse = {
  id: string;
  user: string;
  anthropometricEvaluation: BasicAnthropometricEvaluation[];
  createdAt: Date;
  updatedAt: Date;
};
