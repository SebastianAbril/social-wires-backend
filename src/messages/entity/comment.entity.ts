import { Entity, Column, ManyToOne } from 'typeorm';
import { Message } from './message.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comment extends BaseEntity {
  @Exclude()
  @ManyToOne(() => Message)
  message: Message;

  @Column({ name: 'author_id' })
  author: number;

  @Column()
  comment: string;
}
