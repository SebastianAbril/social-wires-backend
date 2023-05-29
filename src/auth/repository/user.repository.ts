import { User } from '../entity/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
}
