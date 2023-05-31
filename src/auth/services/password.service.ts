import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const SaltOrRounds = 10;

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SaltOrRounds);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
