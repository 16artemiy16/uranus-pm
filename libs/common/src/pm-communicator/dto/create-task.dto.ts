import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop()
  body?: string;

  @ApiProperty()
  @Prop()
  assigneeId?: string;
}
