import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../auth/entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {
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

    const passwordHash = await this.passwordService.hash(password);

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
