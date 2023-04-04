import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { SignupRequestDTO } from './dto/SignupRequest.dto';

@Controller('/wires/auth/signup')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() request: SignupRequestDTO): Promise<User> {
    const user = await this.userService.createUser(
      request.username,
      request.password,
      request.fullname,
    );

    return user;
  }
}
