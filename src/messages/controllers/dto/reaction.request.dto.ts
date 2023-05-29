import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReactionRequestDTO {
  @ApiProperty({
    description: 'The reaction to the message',
    example: 'This is amazing',
  })
  @IsString()
  @IsNotEmpty()
  reaction: string;
}
