import { Controller, Post, Get, Put, Delete, Param, Body, Req, UseGuards, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto} from './dto/create-event.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { multerOptions } from '../helper/fileUpload';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', undefined, multerOptions))
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Req() req,
    @UploadedFiles() images: Express.Multer.File[]
  ) {    
    const imageUrls = images.map(file => `/${file.filename}`);
    createEventDto.images = imageUrls;
    return this.eventService.createEvent(createEventDto, req.user.id);
  }



  @Get(':id')
  async getEvent(@Param('id') id: number) {
    return this.eventService.getEvent(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto, @Req() req, @UploadedFiles() images: Express.Multer.File[]) {
    // Process images and store their paths/URLs in the updateEventDto.images
    return this.eventService.updateEvent(id, updateEventDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteEvent(@Param('id') id: number, @Req() req) {
    return this.eventService.deleteEvent(id, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getEvents(
  @Query('page') page: number,
  @Query('limit') limit: number,
  @Query('sortBy') sortBy: string,
  @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  @Query('search') search: any,
  @Query('startDate')startDate:any,
  @Query('endDate')endDate:any,
  @Req() req
) {
  return this.eventService.getEvents(req.user.id,page, limit, sortBy, sortOrder, search,startDate,endDate);
}
}
