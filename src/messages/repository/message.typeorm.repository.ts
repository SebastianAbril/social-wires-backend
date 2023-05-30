import { InjectEntityManager } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { EntityManager } from 'typeorm';
import { Message } from '../entity/message.entity';

export class MessageTypeORMRepository implements MessageRepository {
  private entityManager: EntityManager;
  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
  }
  save(message: Message): Promise<Message> {
    return this.entityManager.save(message);
  }

  findMessageById(messageId: number): Promise<Message> {
    return this.entityManager.findOneBy(Message, { id: messageId });
  }

  findAllMessages(): Promise<Message[]> {
    return this.entityManager.find(Message);
  }

  findMessagesByUser(userId: number): Promise<Message[]> {
    return this.entityManager.find(Message, { where: { userId: userId } });
  }
  remove(message: Message): Promise<Message> {
    return this.entityManager.remove(message);
  }
}
