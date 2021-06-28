import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema({ timestamps: { createdAt: true } })
export class Board {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ default: [] })
  members: string[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
BoardSchema.index({ ownerId: 1, name: 1 });
