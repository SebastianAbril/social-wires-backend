import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { SignupRequestDTO } from './dto/SignupRequest.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/wires/auth/signup')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ description: 'This endpoint creates an User' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The user has been sucessfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check the parameters of the Request.',
  })
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
