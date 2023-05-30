import { Message } from '../entity/message.entity';

export interface MessageRepository {
  save(message: Message): Promise<Message>;
  findMessageById(messageId: number): Promise<Message>;
  findAllMessages(): Promise<Message[]>;
  findMessagesByUser(userId: number): Promise<Message[]>;
  remove(message: Message): Promise<Message>;
}
