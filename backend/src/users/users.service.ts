import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import axios from 'axios';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, password,email } = createUserDto;
    const userExists = await this.userRepository.findOne({ where: { email } });

    if (userExists) throw new ConflictException('email already exists');
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email:email
    });
    this.userRepository.save(user);
    const loginResponse = await axios.post('http://localhost:3000/auth/login', {
      username: username,
      password: password,
    });
    return {access_token:loginResponse.data?.access_token};

  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['events']
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    else if(updateUserDto.email){
      updateUserDto.email=updateUserDto.email;
    }else if(updateUserDto.username){
      updateUserDto.email=updateUserDto.email;
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
