import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { CreateMessageDTO } from './dto/create.message.dto';
import { MessageResponseDTO, messageToDTO } from './dto/message.response.dto';
import { Message } from '../entity/message.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('/wires/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body() request: CreateMessageDTO,
  ): Promise<MessageResponseDTO> {
    const message = await this.messageService.createMessage(
      request.userId,
      request.title,
      request.content,
    );

    return messageToDTO(message);
  }

  @Get('/')
  async getAllMessages(): Promise<MessageResponseDTO[]> {
    const messages = await this.messageService.getAllMessages();
    return messages.map((message) => messageToDTO(message));
  }

  @Get('/me/:id')
  async getMessagesByUser(@Param() params): Promise<MessageResponseDTO[]> {
    const messages = await this.messageService.getMessagesByUser(params.id);
    return messages.map((message) => messageToDTO(message));
  }

  @Get('/message/:id')
  async getMessageById(@Param() params): Promise<Message> {
    const message = await this.messageService.getMessageById(params.id);
    return message;
  }

  @Delete('/message/:id/:userId')
  async deleteMessageById(@Param() params): Promise<Message> {
    const deletedMessage = await this.messageService.deleteMessageById(
      params.id,
      params.userId,
    );

    return deletedMessage;
  }
}
