import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async signIn(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneByUsername(username);
    if (user === null) {
      throw new UnauthorizedException('The user or password is not valid');
    }

    if (!(await this.passwordService.compare(password, user.password))) {
      throw new UnauthorizedException('The user or password is not valid');
    }

    const payload = { username: user.username, userId: user.id };

    return await this.jwtService.signAsync(payload);
  }
}
