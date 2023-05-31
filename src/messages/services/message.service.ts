import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { UserRepository } from '../../auth/repository/user.repository';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MessageRepository')
    private messageRepository: MessageRepository,
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async createMessage(
    userId: number,
    title: string,
    content: string,
  ): Promise<Message> {
    const user = await this.userRepository.findOneBy(userId);

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
    return this.messageRepository.findAllMessages();
  }

  async getMessagesByUser(userId: number): Promise<Message[]> {
    const user = await this.userRepository.findOneBy(userId);

    if (user == undefined || user == null) {
      throw new NotFoundException(`User with id ${userId} was not found`);
    }

    return this.messageRepository.findMessagesByUser(userId);
  }

  async getMessageById(messageId: number): Promise<Message> {
    const message = await this.messageRepository.findMessageById(messageId);

    if (message == undefined || message == null) {
      throw new NotFoundException(`Message with id ${messageId} was not found`);
    }
    return message;
  }

  async deleteMessageById(messageId: number, userId: number): Promise<Message> {
    const message = await this.messageRepository.findMessageById(messageId);
    const user = await this.userRepository.findOneBy(userId);

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
