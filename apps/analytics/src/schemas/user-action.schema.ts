import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserActionDocument = UserAction & Document;

@Schema({
  timestamps: {
    createdAt: 'timestamps',
    updatedAt: false,
  },
})
export class UserAction {
  @Prop({ required: true })
  user: string;

  @Prop({
    required: true,
    enum: ['visit'],
  })
  action: string;

  @Prop({
    type: Object,
  })
  params: any;
}

export const UserActionSchema = SchemaFactory.createForClass(UserAction);
UserActionSchema.index({ user: 1 });
