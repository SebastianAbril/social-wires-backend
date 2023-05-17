import {
  Controller,
  Patch,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { ReactionService } from '../services/reaction.service';
import { ReactionRequestDTO } from './dto/reaction.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('/wires/messages/reaction')
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

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
