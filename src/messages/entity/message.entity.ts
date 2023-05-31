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

  @Column()
  title: string;

  @Column()
  text: string;

  @OneToMany(() => Comment, (comment) => comment.message, { eager: true })
  comments: Comment[];

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
