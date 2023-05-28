import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDTO {
  @IsString()
  @IsNotEmpty()
  commnet: string;
  @IsNumber()
  @IsNotEmpty()
  author: number;
}
