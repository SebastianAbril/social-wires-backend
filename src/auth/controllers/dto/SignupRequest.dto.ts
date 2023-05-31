import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupRequestDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Sebastian',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'SebastianAbril@gmail.com',
  })
  @ApiProperty({
    description: 'The password of the user',
    example: '13dssdg2r23',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The fullname of the user',
    example: 'Juan Sebastian Abril Abril',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;
}
