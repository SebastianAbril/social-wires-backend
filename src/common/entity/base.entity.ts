import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;
}
