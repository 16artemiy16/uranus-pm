import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemoveMembersDto {
  @ApiProperty()
  @IsNotEmpty()
  members: string[];
}
