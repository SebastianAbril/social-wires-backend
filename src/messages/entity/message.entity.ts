import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';

@Entity()
export class Message extends BaseEntity {
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
