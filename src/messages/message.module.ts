import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MessageController } from './controllers/message.controller';
import { Message } from './entity/message.entity';
import { Reaction } from './entity/reaction.entity';
import { MessageService } from './services/message.service';
import { Comment } from './entity/comment.entity';
import { ReactionService } from './services/reaction.service';
import { ReactionController } from './controllers/reaction.controller';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { UserTypeORMRepository } from 'src/auth/repository/user.typeorm.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Message, Comment, Reaction])],
  controllers: [MessageController, ReactionController, CommentController],
  providers: [
    MessageService,
    ReactionService,
    CommentService,
    { provide: 'UserRepository', useClass: UserTypeORMRepository },
  ],
})
export class MessageModule {}
