import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SuperuserRole } from './role.enum';

export type SuperuserDocument = HydratedDocument<Superuser>;

@Schema()
export class Superuser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    required: true,
    enum: Object.values(SuperuserRole),
    default: '',
  })
  role: string;

  @Prop({ required: true, default: null })
  roleId: number;

  @Prop({ required: true, unique: true })
  registerNumber: number;

  @Prop()
  description: string;

  @Prop()
  refresh_token: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const SuperuserSchema = SchemaFactory.createForClass(Superuser);
