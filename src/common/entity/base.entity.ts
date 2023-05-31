import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'The id of the entity',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The date of creation',
    example: '01/02/2023',
  })
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;
}
