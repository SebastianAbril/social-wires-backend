import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
