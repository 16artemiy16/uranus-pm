import { ApiProperty } from '@nestjs/swagger';

export class AssignTaskDto {
  @ApiProperty({ required: true })
  assignee: string;
}
