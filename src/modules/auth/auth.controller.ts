import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AuthUser,
  IpAddress,
  JwtAuthGuard,
  JwtPayload,
  JwtRefreshGuard,
} from '../../core';
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
import { SessionService } from './services/session.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

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

  @Put('/refresh')
  @ApiUnauthorizedResponse({
    description: 'Return 401 if passed token is not valid',
  })
  @ApiOkResponse({
    description: 'Return tokens pair',
  })
  @UseGuards(JwtRefreshGuard)
  async refresh(@Query('refreshToken') refreshToken: string) {
    const payload = await this.sessionService.checkRefreshToken(refreshToken);
    const response = await this.authService.refreshToken(payload);
    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
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
