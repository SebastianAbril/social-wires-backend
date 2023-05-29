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
import { MessageResponseDTO, messageToDTO } from './dto/message.response.dto';
import { Message } from '../entity/message.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, UserRequest } from 'src/auth/decorator/user.decorator';

@ApiTags('Messages')
@Controller('/wires/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOperation({ description: 'This endpoint creates a Message' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The message was created sucessfully',
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
  ): Promise<MessageResponseDTO> {
    const message = await this.messageService.createMessage(
      userRequest.userId,
      request.title,
      request.content,
    );
    return messageToDTO(message);
  }

  @ApiOperation({
    description: 'Gets a list with all the messages',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: ' OK. The list of messages was gotten sucessfully',
  })
  @Get('/')
  async getAllMessages(): Promise<MessageResponseDTO[]> {
    const messages = await this.messageService.getAllMessages();
    return messages.map((message) => messageToDTO(message));
  }

  @ApiOperation({
    description: 'Gets the messages of the specified user by his id',
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Ok.The user's messages were gotten sucessfully",
  })
  @Get('/me/:id')
  async getMessagesByUser(@Param() params): Promise<MessageResponseDTO[]> {
    const messages = await this.messageService.getMessagesByUser(params.id);
    return messages.map((message) => messageToDTO(message));
  }

  @ApiOperation({ description: "Gets a message by the message's id" })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Ok. The message was gotten sucessfully',
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
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check your request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The message or the user were not found',
  })
  @Delete('/message/:id/:userId')
  async deleteMessageById(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<Message> {
    const deletedMessage = await this.messageService.deleteMessageById(
      id,
      userId,
    );

    return deletedMessage;
  }
}
