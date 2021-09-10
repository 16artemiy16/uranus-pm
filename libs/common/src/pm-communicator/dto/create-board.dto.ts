import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;
}
