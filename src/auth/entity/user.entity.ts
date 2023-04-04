import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  fullname: string;
}
