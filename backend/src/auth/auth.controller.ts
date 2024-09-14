import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto.stoo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
