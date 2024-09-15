import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Images } from '../common/entities/images.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Images)
    private imagesRepository: Repository<Images>
  ) {}

  async createEvent(createEventDto: CreateEventDto, userId: number): Promise<Event> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    let event = this.eventRepository.create({
      name:createEventDto.name,
      creator:user,
      startDate:createEventDto.startDate,
      description:createEventDto.description,
      endDate:createEventDto.endDate,
      totalGuests:createEventDto.totalGuests
    });
   
    let afterSave= await this.eventRepository.save(event);
    const images = createEventDto.images.map(image => {
      return this.imagesRepository.create({
        images: image, 
        event: afterSave
      });
    });
  
    // Save the images in bulk
    await this.imagesRepository.save(images);
    return afterSave;
  }
  async getEvent(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({where:{id:id}});
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto, userId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['creator']
    });

    if (!event) throw new NotFoundException('Event not found');

    if (event.creator.id !== userId) throw new ForbiddenException('Not authorized to update this event');

    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number, userId: number): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['creator'] 
    });

    if (!event) throw new NotFoundException('Event not found');

    if (event.creator.id !== userId) throw new ForbiddenException('Not authorized to delete this event');

    await this.eventRepository.remove(event);
  }

  async getEvents(
  userId: number,
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'name',
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  search: string = '',
  startDate?: string,
  endDate?: string,
  ): Promise<Event[]> {
    const query = this.eventRepository.createQueryBuilder('event')
    .leftJoinAndSelect('event.images', 'images')  
    .leftJoinAndSelect('event.creator', 'creator')
    .where('creator.id = :userId', { userId })  
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy(`event.${sortBy}`,sortOrder)
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
