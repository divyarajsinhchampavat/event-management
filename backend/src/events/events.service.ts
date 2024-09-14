import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createEvent(createEventDto: CreateEventDto, userId: number): Promise<Event> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const event = this.eventRepository.create({
      ...createEventDto,
      creator: user
    });
    return this.eventRepository.save(event);
  }

  async getEvent(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({where:{id:id}});
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto, userId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['creator'] // Use the updated syntax
    });

    if (!event) throw new NotFoundException('Event not found');

    if (event.creator.id !== userId) throw new ForbiddenException('Not authorized to update this event');

    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number, userId: number): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['creator'] // Use the updated syntax
    });

    if (!event) throw new NotFoundException('Event not found');

    if (event.creator.id !== userId) throw new ForbiddenException('Not authorized to delete this event');

    await this.eventRepository.remove(event);
  }

  async getEvents(
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'name',
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  search: string = '',
  startDate?: string,
  endDate?: string,
  ): Promise<Event[]> {
    const query = this.eventRepository.createQueryBuilder('event')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(`event.${sortBy}`,sortOrder);
    
    // Basic Filters
    // Search by name
    if (search) {
      query.andWhere('(event.name ILIKE :name OR event.description ILIKE :name)', { name: `%${search.toLowerCase()}%` });
    }

    if (startDate && endDate) {
      query.andWhere('(event.startDate BETWEEN :startDate AND :endDate OR event.endDate BETWEEN :startDate AND :endDate)', { startDate, endDate });
    }
    
    return query.getMany();
  }
  
  
}
