import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentRequestDTO {
  @ApiProperty({
    description: 'The comment of the author',
    example: 'This is an example of a comment, have a nice day',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
  @ApiProperty({
    description: "The author's id",
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  author: number;
}
