import * as dotenv from 'dotenv';
import { Message } from '../messages/entity/message.entity';
import { Reaction } from '../messages/entity/reaction.entity';
import { Comment } from '../messages/entity/comment.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../auth/entity/user.entity';
import { initial1680571054636 } from '../migrations/1680571054636-initial';

dotenv.config();

export const database = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Message, Comment, Reaction],
  migrations: [initial1680571054636],
  namingStrategy: new SnakeNamingStrategy(),
};
