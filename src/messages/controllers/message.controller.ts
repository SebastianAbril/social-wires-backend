import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { CreateMessageDTO } from './dto/create.message.dto';
import { Message } from '../entity/message.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserRequest } from '../../auth/decorator/user.decorator';

@ApiBearerAuth()
@ApiTags('Messages')
@Controller('/wires/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOperation({ description: 'This endpoint creates a Message' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The message was created sucessfully',
    type: Message,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check the Request parameters',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The user was not found.',
  })
  @Post()
  async createMessage(
    @Body() request: CreateMessageDTO,
    @User() userRequest: UserRequest,
  ): Promise<Message> {
    const message = await this.messageService.createMessage(
      userRequest.userId,
      request.title,
      request.content,
    );
    return message;
  }

  @ApiOperation({
    description: 'Gets a list with all the messages',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: ' OK. The list of messages was gotten sucessfully',
    isArray: true,
    type: Message,
  })
  @Get('/')
  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messageService.getAllMessages();
    return messages;
  }

  @ApiOperation({
    description: 'Gets the messages of the specified user by his id',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Ok.The user's messages were gotten sucessfully",
    isArray: true,
    type: Message,
  })
  @Get('/me')
  async getMessagesByUser(
    @User() userRequest: UserRequest,
  ): Promise<Message[]> {
    const messages = await this.messageService.getMessagesByUser(
      userRequest.userId,
    );
    return messages;
  }

  @ApiOperation({ description: "Gets a message by the message's id" })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Ok. The message was gotten sucessfully',
    type: Message,
  })
  @Get('/message/:id')
  async getMessageById(@Param() params): Promise<Message> {
    const message = await this.messageService.getMessageById(params.id);
    return message;
  }

  @ApiOperation({
    description: 'Deletes a message by its id',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Ok. The message was deleted sucessfully',
    type: Message,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check your request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The message or the user were not found',
  })
  @Delete('/message/:id')
  async deleteMessageById(
    @Param('id', new ParseIntPipe()) id: number,
    @User() userRequest: UserRequest,
  ): Promise<Message> {
    const deletedMessage = await this.messageService.deleteMessageById(
      id,
      userRequest.userId,
    );

    return deletedMessage;
  }
}
