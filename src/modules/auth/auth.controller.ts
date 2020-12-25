import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthUser, IpAddress, JwtAuthGuard, JwtPayload } from '../../core';
import { LoginRequest } from './dto/login/login.request';
import { AuthService } from './services/auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterRequest } from './dto/register/register.request';
import { LoginResponse } from './dto/login/login.response';
import { RegisterResponse } from './dto/register/register.response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return tokens pair',
    type: LoginResponse,
  })
  async login(@IpAddress() ipAddress: string, @Body() model: LoginRequest) {
    const { accessToken, refreshToken } = await this.authService.login(
      model,
      ipAddress,
    );
    const response = new LoginResponse(accessToken, refreshToken);
    return response;
  }

  @Get('/refresh')
  @ApiUnauthorizedResponse({
    description: 'Return 401 if passed token is not valid',
  })
  @ApiOkResponse({
    description: 'Return tokens pair',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async refresh(@AuthUser() user: JwtPayload) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      user,
    );
    return { accessToken, refreshToken };
  }

  @Post('/register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return new user',
    type: RegisterResponse,
  })
  async register(@Body() model: RegisterRequest) {
    const user = await this.authService.register(model);
    const response = new RegisterResponse(user);
    return response;
  }
}
