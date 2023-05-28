import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReactionDTO {
  @IsString()
  @IsNotEmpty()
  reaction: string;
  @IsNumber()
  @IsNotEmpty()
  author: number;
}
