import { Reaction } from '../entity/reaction.entity';

export interface ReactionRepository {
  save(reaction: Reaction): Promise<Reaction>;
}
