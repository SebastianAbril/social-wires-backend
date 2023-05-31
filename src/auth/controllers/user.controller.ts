import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { SignupRequestDTO } from './dto/SignupRequest.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { SignInRequest } from './dto/SignInRequest.dto';
import { SignInRespose } from './dto/SignInResponse.dto';
import { Public } from '../decorator/public.decorator';

@ApiTags('Auth')
@Controller('/wires/auth')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ description: 'This endpoint creates an User' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The user has been sucessfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check the parameters of the Request.',
  })
  @Post('/signup')
  @Public()
  async signup(@Body() request: SignupRequestDTO): Promise<User> {
    const user = await this.userService.createUser(
      request.username,
      request.password,
      request.fullname,
    );

    return user;
  }

  @ApiOperation({ description: 'This endpoints allows an User to sign in' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The user has signed up sucessfully.',
    type: SignInRespose,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check the parameters of the Request.',
  })
  @Post('/signin')
  @Public()
  async signIn(@Body() request: SignInRequest): Promise<SignInRespose> {
    const token = await this.authService.signIn(
      request.username,
      request.password,
    );

    const signInRespose = new SignInRespose();
    signInRespose.access_token = token;

    return signInRespose;
  }
}
