import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { CommentService } from '../services/comment.service';
import { CommentRequestDTO } from './dto/comment.request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Messages')
@Controller('wires/messages/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ description: 'This endpoint creates a comment on a message' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The comment was created sucessfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check your Request.',
  })
  @ApiResponse({
    status: 404,
    description:
      'Not found. The message was not found or the author was not found',
  })
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
