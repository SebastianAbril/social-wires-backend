import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReactionRequestDTO {
  @ApiProperty({
    description: 'The reaction to the message',
    example: 'This is amazing',
  })
  @IsString()
  @IsNotEmpty()
  reaction: string;

  @ApiProperty({
    description: 'The author of the Reaction',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  author: number;
}
