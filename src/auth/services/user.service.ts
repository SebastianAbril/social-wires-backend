import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../auth/entity/user.entity';
import { UserRepository } from '../repository/user.repository';

export const SaltOrRounds = 10;

@Injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor(@Inject('UserRepository') userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(
    username: string,
    password: string,
    fullname: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneByUsername(username);
    if (user) {
      throw new BadRequestException(`Username already used`);
    }

    const passwordHash = await bcrypt.hash(password, SaltOrRounds);

    const newUser = new User();
    newUser.username = username;
    newUser.password = passwordHash;
    newUser.fullname = fullname;

    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneByUsername(username);
  }
}
