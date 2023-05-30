import { InjectEntityManager } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { EntityManager } from 'typeorm';
import { Comment } from '../entity/comment.entity';

export class CommentTypeORMRepository implements CommentRepository {
  private entityManager: EntityManager;

  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
  }

  save(comment: Comment): Promise<Comment> {
    return this.entityManager.save<Comment>(comment);
  }
}
