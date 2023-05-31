import { ApiProperty } from '@nestjs/swagger';

export class SignInRespose {
  @ApiProperty({
    description: 'The access token',
    example: 'asfas213423328fs01092',
  })
  access_token: string;
}
