import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BoardMemberSchema } from './board-member.schema';
import { BoardMemberI } from 'common/pm-communicator/models/entities/board-member.interface';

export type BoardDocument = Board & Document;

@Schema({ timestamps: { createdAt: true } })
export class Board {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ default: [], type: [BoardMemberSchema] })
  members: BoardMemberI[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
BoardSchema.index({ ownerId: 1, name: 1 });
