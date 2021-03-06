import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: { createdAt: true } })
export class Task {
  @Prop({ required: true })
  _id: string;

  @Prop()
  number: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;

  @Prop({ required: true })
  boardId: string;

  @Prop()
  assignee: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ boardId: 1, number: 1 }, { uniq: true });
