import { ApiProperty } from '@nestjs/swagger';

export class MoveTaskDto {
  @ApiProperty({ required: true })
  toIndex: number;

  @ApiProperty()
  targetBoardId: string;
}
