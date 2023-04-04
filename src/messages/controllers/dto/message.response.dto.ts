import { Message } from 'src/messages/entity/message.entity';

export class MessageResponseDTO {
  id: number;
  user: number;
  title: string;
  text: string;
  comments: CommentDTO[];
  reactions: ReactionDTO[];
  createAt: Date;
}

export class ReactionDTO {
  reaction: string;
  author: number;
}
export class CommentDTO {
  commnet: string;
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
