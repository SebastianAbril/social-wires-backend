import {
  Controller,
  Patch,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { ReactionService } from '../services/reaction.service';
import { ReactionRequestDTO } from './dto/reaction.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('/wires/messages/reaction')
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @ApiOperation({
    description: 'Creates a reaction on a specific comment',
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'was updated sucessfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check your Request',
  })
  @ApiResponse({
    status: 404,
    description:
      'Not found. The message was not found or the author was not found',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  async createReaction(
    @Param() params,
    @Body() request: ReactionRequestDTO,
  ): Promise<Message> {
    const message = await this.reactionService.createReaction(
      params.id,
      request.author,
      request.reaction,
    );

    return message;
  }
}
