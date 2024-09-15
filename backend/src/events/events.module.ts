import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Event } from './entities/event.entity';
import { Images } from '../common/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User,Images])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventsModule {}
