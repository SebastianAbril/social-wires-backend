import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Mariana',
  })
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    description: 'The fullname of the user',
    example: 'Mariana Caicedo',
  })
  @Column()
  fullname: string;
}
