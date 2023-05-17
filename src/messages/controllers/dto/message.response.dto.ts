import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Message } from 'src/messages/entity/message.entity';

export class MessageResponseDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsNumber()
  @IsNotEmpty()
  user: number;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsArray()
  @IsNotEmpty()
  comments: CommentDTO[];
  @IsArray()
  @IsNotEmpty()
  reactions: ReactionDTO[];
  @IsDate()
  @IsNotEmpty()
  createAt: Date;
}

export class ReactionDTO {
  @IsString()
  @IsNotEmpty()
  reaction: string;
  @IsNumber()
  @IsNotEmpty()
  author: number;
}
export class CommentDTO {
  @IsString()
  @IsNotEmpty()
  commnet: string;
  @IsNumber()
  @IsNotEmpty()
  author: number;
}

export const messageToDTO = (message: Message) => {
  const messageDto = new MessageResponseDTO();
  messageDto.id = message.id;
  messageDto.user = message.userId;
  messageDto.title = message.title;
  messageDto.text = message.text;

  messageDto.reactions = message.reactions?.map((reaction) => ({
    reaction: reaction.reaction,
    author: reaction.author,
  }));
  return messageDto;
};
