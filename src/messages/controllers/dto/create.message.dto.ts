import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty({
    description: 'The title of the message',
    example: 'Empowering my brain',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello my name is Juan',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
