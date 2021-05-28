import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'pass123456',
  })
  @IsNotEmpty()
  password: string;
}
