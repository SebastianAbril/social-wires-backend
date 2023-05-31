import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Message extends BaseEntity {
  @ApiProperty({
    description: 'The user id',
    example: 1,
  })
  @Column()
  userId: number;

  @ApiProperty({
    description: 'The title of the message',
    example: 'King for thousand years',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'The text of the message',
    example: 'This is a great history',
  })
  @Column()
  text: string;

  @ApiProperty({
    description: 'The comments of the message',
    example: 'This is the comment',
  })
  @OneToMany(() => Comment, (comment) => comment.message, { eager: true })
  comments: Comment[];

  @ApiProperty({
    description: 'The reactions of the message',
    example: 'This is the reaction',
  })
  @OneToMany(() => Reaction, (reaction) => reaction.message, { eager: true })
  reactions: Reaction[];

  addReaction(reaction: Reaction) {
    if (this.reactions == null) {
      this.reactions = [];
    }

    this.reactions.push(reaction);
  }

  addComment(comment: Comment) {
    if (this.comments == null) {
      this.comments = [];
    }

    this.comments.push(comment);
  }
}
