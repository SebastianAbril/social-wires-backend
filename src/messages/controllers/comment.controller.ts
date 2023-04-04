import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { CommentService } from '../services/comment.service';
import { CommentRequestDTO } from './dto/comment.request.dto';

@Controller('wires/messages/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  async createComment(
    @Param() params,
    @Body() request: CommentRequestDTO,
  ): Promise<Message> {
    const message = await this.commentService.createComment(
      params.id,
      request.author,
      request.comment,
    );

    return message;
  }
}
