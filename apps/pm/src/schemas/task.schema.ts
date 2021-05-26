import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: { createdAt: true } })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;

  @Prop({ required: true })
  boardId: string;

  @Prop()
  assigneeId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ boardId: 1 });
