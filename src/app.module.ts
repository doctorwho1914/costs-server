import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Cost} from './entities/cost.entity';
import {Category} from './entities/category.entity';

const entities = [Cost, Category];

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    TypeOrmModule
      .forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'costs',
      entities,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
