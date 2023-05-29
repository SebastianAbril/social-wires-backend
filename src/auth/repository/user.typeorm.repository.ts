import { EntityManager } from 'typeorm';
import { UserRepository } from './user.repository';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

export class UserTypeORMRepository implements UserRepository {
  private entityManager: EntityManager;

  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
  }

  save(user: User): Promise<User> {
    return this.entityManager.save<User>(user);
  }

  findOneBy(id: number): Promise<User> {
    return this.entityManager.findOneBy(User, { id: id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.entityManager.findOneBy(User, { username: username });
  }
}
