import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity'; 
import { Event } from './events/entities/event.entity';
import { join } from 'path';
import 'dotenv/config'; 
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Images } from './common/entities/images.entity';


@Injectable()
export class GetTypeormConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [join(__dirname, '/entity/*.entity.{js,ts}')],
      migrations: [join(__dirname, '/migration/*.{js,ts}')],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    };
  }
}

export const AppDataSource  = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [User, Event,Images],
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')], // Path where migrations will be stored
  synchronize: false,  // Since we are using migrations, we don't need synchronize
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
