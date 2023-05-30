import { Comment } from '../entity/comment.entity';

export interface CommentRepository {
  save(comment: Comment): Promise<Comment>;
}
