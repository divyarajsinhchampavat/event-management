import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto)  {
    @IsOptional()
    name?: string;
  
    @IsOptional()
    description?: string;
  
    @IsOptional()
    startDate?: Date;
  
    @IsOptional()
    endDate?: Date;
  
    @IsOptional()
    totalGuests?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];
  }