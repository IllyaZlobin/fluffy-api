import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../core/typeorm/entities/user.entity';
import { AuthUser, Gender, IpAddress, JwtAuthGuard, JwtPayload, Roles } from '../../core';
import { LoginRequest } from './dto/login/login.request';
import { AuthService } from './services/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterRequest } from './dto/register/register.request';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  @Post('/login')
  async login(@IpAddress() ipAddress: string, @Body() model: LoginRequest) {
    const response = await this.authService.login(model, ipAddress);
    return response;
  }

  @Post('/register')
  async register(@Body() model: RegisterRequest) {
    const response = await this.authService.register(model);
    return response;
  }

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getInfo(@AuthUser() user: JwtPayload) {
    console.log(user);
    return 'hi!';
  }
}
