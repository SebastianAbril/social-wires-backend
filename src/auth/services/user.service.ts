import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../auth/entity/user.entity';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
    fullname: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (user) {
      throw new BadRequestException(`Username already used`);
    }

    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    const newUser = new User();
    newUser.username = username;
    newUser.password = passwordHash;
    newUser.fullname = fullname;

    return this.userRepository.save(newUser);
  }
}
