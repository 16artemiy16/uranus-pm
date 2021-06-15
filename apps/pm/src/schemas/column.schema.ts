import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskSchema } from './task.schema';
import { TaskI } from 'common/pm-communicator/models/entities/task.interface';

export type ColumnDocument = Column & Document;

@Schema()
export class Column {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  boardId: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: [], type: [TaskSchema] })
  tasks: TaskI[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
ColumnSchema.index({ name: 1, boardId: 1 });
