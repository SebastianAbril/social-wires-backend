import { EntityManager } from 'typeorm';
import { ReactionRepository } from './reaction.repository';
import { Reaction } from '../entity/reaction.entity';

export class ReactionTypeORMRepository implements ReactionRepository {
  private entitiyManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entitiyManager = entityManager;
  }

  save(reaction: Reaction): Promise<Reaction> {
    return this.entitiyManager.save(reaction);
  }
}
