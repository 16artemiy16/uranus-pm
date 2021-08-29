import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class TraceUserEventDto {
  @ApiProperty()
  @ApiModelProperty({
    type: 'string',
    description: 'Tracing action user id',
  })
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @ApiModelProperty({
    enum: ['visit', 'test'],
    type: 'string',
    description: 'Tracing action name',
  })
  @IsNotEmpty()
  @IsEnum(['visit', 'test'])
  action: string;
}
