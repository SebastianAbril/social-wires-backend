import { User } from '../entity/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
  findOneBy(id: number): Promise<User>;
  findOneByUsername(username: string): Promise<User>;
}
