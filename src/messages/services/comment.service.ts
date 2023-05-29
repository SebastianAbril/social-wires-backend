import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../entity/message.entity';
import { Comment } from '../entity/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../auth/repository/user.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject('UserRepository')
    private userRepository: UserRepository,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(
    messageId: number,
    userId: number,
    comment: string,
  ): Promise<Message> {
    const user = await this.userRepository.findOneBy(userId);
    if (user == null) {
      throw new NotFoundException(`User with id ${userId} was not found`);
    }

    const message = await this.messageRepository.findOneBy({ id: messageId });
    if (message == null) {
      throw new NotFoundException(
        `The Message with id ${messageId} was not found`,
      );
    }

    if (user.id == message.userId) {
      throw new BadRequestException(
        `You can not create a comment in your own message`,
      );
    }

    let newComment = new Comment();
    newComment.author = user.id;
    newComment.message = message;
    newComment.comment = comment;

    newComment = await this.commentRepository.save(newComment);

    message.addComment(newComment);

    return await this.messageRepository.save(message);
  }
}
