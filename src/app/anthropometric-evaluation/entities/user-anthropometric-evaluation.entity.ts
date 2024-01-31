import { Superuser } from './../../superuser/entities/superuser.entity';
import { User } from './../../user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type AnthropometricEvaluationDocument =
  HydratedDocument<AnthropometricEvaluation>;

@Schema()
export class AnthropometricEvaluation {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({
    type: [
      {
        admin: {
          type: Types.ObjectId,
          ref: Superuser.name,
          required: true,
        },

        physicalActivityLevel: {
          type: Number,
          required: true,
          default: null,
        },
        currentWeight: {
          type: Number,
          required: true,
          default: null,
        },

        circumferenceAbdominal: {
          type: Number,
          default: null,
        },
        circumferenceWaist: {
          type: Number,
          default: null,
        },
        circumferenceArm: {
          type: Number,
          default: null,
        },
        circumferenceCalf: {
          type: Number,
          default: null,
        },
        circumferenceHip: {
          type: Number,
          default: null,
        },

        skinfoldBiceps: {
          type: Number,
          required: true,
          default: null,
        },
        tricepsSkinfold: {
          type: Number,
          default: null,
        },
        skinfoldSubscapular: {
          type: Number,
          required: true,
          default: null,
        },
        skinfoldMediumAxillary: {
          type: Number,
          default: null,
        },
        suprailiacSkinfold: {
          type: Number,
          required: true,
          default: null,
        },
        supraspinalSkinfold: {
          type: Number,
          default: null,
        },
        abdominalSkinfold: {
          type: Number,
          required: true,
          default: null,
        },
        thighSkinfold: {
          type: Number,
          required: true,
          default: null,
        },
        skinfoldCalf: {
          type: Number,
          default: null,
        },
        skinfoldBreastplate: {
          type: Number,
          default: null,
        },

        createdAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
      },
    ],
  })
  anthropometricEvaluation: [
    {
      _id: Types.ObjectId;
      admin: Types.ObjectId;
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
    },
  ];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const AnthropometricEvaluationSchema = SchemaFactory.createForClass(
  AnthropometricEvaluation,
);
AnthropometricEvaluationSchema.plugin(mongoosePaginate);
