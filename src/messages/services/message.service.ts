import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entity/message.entity';
import { User } from '../../auth/entity/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createMessage(
    userId: number,
    title: string,
    content: string,
  ): Promise<Message> {
    console.log('Esta entrando');
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user == undefined) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const message = new Message();
    message.userId = user.id;
    message.title = title;
    message.text = content;

    return this.messageRepository.save(message);
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async getMessagesByUser(userId: number): Promise<Message[]> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user == undefined) {
      throw new BadRequestException(`User with id ${userId} was not found`);
    }

    return this.messageRepository.find({ where: { userId } });
  }

  async getMessageById(messageId: number): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id: messageId });

    if (message == undefined) {
      throw new NotFoundException(`Message with id ${messageId} was not found`);
    }
    return message;
  }

  async deleteMessageById(messageId: number, userId: number): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id: messageId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user == null || user == undefined) {
      throw new NotFoundException(`The user with id ${userId} was not found`);
    }
    if (message == undefined || message == null) {
      throw new NotFoundException(
        `Message with id ${messageId} could not be deleted, it was not found`,
      );
    }

    if (userId !== message.userId) {
      throw new BadRequestException(
        `You can not delete other person's comments`,
      );
    }

    const deletedMessage = await this.messageRepository.remove(message);

    return deletedMessage;
  }
}
