import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventsModule {}
