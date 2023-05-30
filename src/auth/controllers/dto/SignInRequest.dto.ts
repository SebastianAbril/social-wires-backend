import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @ApiProperty({ description: 'The name of the user', example: 'Angelica' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'P4ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
