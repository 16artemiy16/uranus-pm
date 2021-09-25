import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;
}
