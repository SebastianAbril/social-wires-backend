import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { ReactionService } from './services/reaction.service';
import { ReactionController } from './controllers/reaction.controller';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { CommentTypeORMRepository } from './repository/comment.typeorm.repository';
import { MessageTypeORMRepository } from './repository/message.typeorm.repository';
import { ReactionTypeORMRepository } from './repository/reaction.typeorm.repository';

@Module({
  imports: [AuthModule],
  controllers: [MessageController, ReactionController, CommentController],
  providers: [
    MessageService,
    ReactionService,
    CommentService,
    {
      provide: 'CommentRepository',
      useClass: CommentTypeORMRepository,
    },
    {
      provide: 'MessageRepository',
      useClass: MessageTypeORMRepository,
    },
    {
      provide: 'ReactionRepository',
      useClass: ReactionTypeORMRepository,
    },
  ],
})
export class MessageModule {}
