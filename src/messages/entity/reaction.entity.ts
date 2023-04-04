import { Entity, Column, ManyToOne } from 'typeorm';
import { Message } from './message.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity()
export class Reaction extends BaseEntity {
  @Exclude()
  @ManyToOne(() => Message)
  message: Message;

  @Column({ name: 'author_id' })
  author: number;

  @Column()
  reaction: string;
}
