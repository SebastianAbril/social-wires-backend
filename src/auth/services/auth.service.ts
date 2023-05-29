import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { SaltOrRounds } from './user.service';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  private jwtService: JwtService;
  constructor(
    @Inject('UserRepository') userRepository: UserRepository,
    jwtService: JwtService,
  ) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async signIn(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneByUsername(username);

    console.log(user);
    console.log('username', username);
    console.log('password', password);

    const hash = await bcrypt.hash(password, SaltOrRounds);

    if (bcrypt.compareSync(hash, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, userId: user.id };

    return await this.jwtService.signAsync(payload);
  }
}
