import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './messages/message.module';
import { database } from './common/database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database.host,
      port: +database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      entities: database.entities,
      namingStrategy: database.namingStrategy,
      logging: true,
    }),
    MessageModule,
  ],
})
export class AppModule {}
