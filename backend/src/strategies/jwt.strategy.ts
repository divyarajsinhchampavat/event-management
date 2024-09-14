// src/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Adjust the import path accordingly
import { JwtPayload } from '../interfaces/jwt-payload.interface'; // Define this interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Ensure you have this in your environment variables
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.findOne(payload.sub); // Adjust the method to find the user by ID
  }
}
