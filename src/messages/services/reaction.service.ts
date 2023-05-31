import * as emoji from 'emoji-js';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { Reaction } from '../entity/reaction.entity';
import { UserRepository } from '../../auth/repository/user.repository';
import { MessageRepository } from '../repository/message.repository';
import { ReactionRepository } from '../repository/reaction.repository';

@Injectable()
export class ReactionService {
  constructor(
    @Inject('MessageRepository')
    private messageRepository: MessageRepository,
    @Inject('UserRepository')
    private userRepository: UserRepository,
    @Inject('ReactionRepository')
    private reactionRepository: ReactionRepository,
  ) {}

  async createReaction(
    messageId: number,
    userId: number,
    reaction: string,
  ): Promise<Message> {
    const user = await this.userRepository.findOneBy(userId);
    if (user == null) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const message = await this.messageRepository.findMessageById(messageId);
    if (message == null) {
      throw new NotFoundException(`message with id ${messageId} not found`);
    }

    if (message.userId == user.id) {
      throw new BadRequestException(`you cant not react to your message`);
    }

    const newReaction = new Reaction();
    newReaction.author = user.id;
    newReaction.message = message;
    newReaction.reaction = this.convertEmojisToAscii(reaction);

    const reactionDb = await this.reactionRepository.save(newReaction);

    message.addReaction(reactionDb);

    return await this.messageRepository.save(message);
  }

  convertEmojisToAscii(text: string): string {
    const emojiInstance = new emoji.EmojiConvertor();
    emojiInstance.replace_mode = 'unified';
    emojiInstance.allow_native = true;
    return emojiInstance.replace_colons(text);
  }
}
