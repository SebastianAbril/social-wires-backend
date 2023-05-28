import * as emoji from 'emoji-js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entity/message.entity';
import { User } from '../../auth/entity/user.entity';
import { Reaction } from '../entity/reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  async createReaction(
    messageId: number,
    userId: number,
    reaction: string,
  ): Promise<Message> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user == null) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const message = await this.messageRepository.findOneBy({
      id: messageId,
    });
    if (message == null) {
      throw new NotFoundException(`message with id ${messageId} not found`);
    }

    if (message.userId == user.id) {
      throw new Error(`you cant not react to your message`);
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
