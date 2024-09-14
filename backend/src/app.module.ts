import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetTypeormConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the config globally available
    }),
    TypeOrmModule.forRootAsync({
    useClass: GetTypeormConfig,
    inject: [GetTypeormConfig],
  }),UsersModule, EventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
