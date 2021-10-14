import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification | Document;

@Schema({
  timestamps: { createdAt: 'timestamps', updatedAt: false },
})
export class Notification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  type: string;

  @Prop({ required: true, default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ userId: 1 });
