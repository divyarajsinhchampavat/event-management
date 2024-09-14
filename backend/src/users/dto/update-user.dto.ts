import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    username?: string;
    password?: string; // Handle password hashing in the service.
    email?: string;
}
