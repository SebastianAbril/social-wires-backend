import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty({
    description: "The user's Id",
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @ApiProperty({
    description: 'The title of the message',
    example: 'Empowering my brain',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    description: 'The content of the message',
    example: "Hello my name is Sebastian and I'm strong",
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
