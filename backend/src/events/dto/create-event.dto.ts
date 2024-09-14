import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber, IsArray } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  totalGuests: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
