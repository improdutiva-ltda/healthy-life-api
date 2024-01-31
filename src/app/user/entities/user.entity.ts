import { Superuser } from './../../superuser/entities/superuser.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { EnumStatus } from './status.enum';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ type: [Types.ObjectId], ref: Superuser.name, required: true })
  superUsers: Types.ObjectId[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    required: true,
    enum: Object.values(EnumStatus),
    default: '',
  })
  status: string;

  @Prop({
    required: true,
    enum: ['inPerson', 'online'],
    default: '',
  })
  typeFollowUp: string;

  @Prop({ default: null })
  paymentDate: Date;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);
