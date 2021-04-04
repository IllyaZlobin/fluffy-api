import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginRequest } from './dto/login/login.request';
import { AuthService } from './services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequest } from './dto/register/register.request';
import { LoginResponse } from './dto/login/login.response';
import { RegisterResponse } from './dto/register/register.response';
import { RefreshSessionRequest } from './dto/refresh/refreshSession.request';
import { RefreshSessionResponse } from './dto/refresh/refreshSession.response';
import {
  AuthUser,
  FriendlyHttpException,
  JwtAuthGuard,
  UserEntity,
} from '../../core';

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
  async login(@Body() model: LoginRequest) {
    try {
      const { cognitoUserSession, user } = await this.authService.login(model);
      const accessToken = cognitoUserSession.getAccessToken().getJwtToken();
      const refreshToken = cognitoUserSession.getRefreshToken().getToken();
      const idToken = cognitoUserSession.getIdToken().getJwtToken();

      const response = new LoginResponse(
        user,
        accessToken,
        refreshToken,
        idToken,
      );

      return response;
    } catch (err) {
      const { message, friendlyStatus } = err;
      throw new FriendlyHttpException(
        friendlyStatus ? friendlyStatus : HttpStatus.BAD_REQUEST,
        message,
      );
    }
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

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated tokens',
    type: RefreshSessionResponse,
  })
  async refreshSession(@Body() model: RefreshSessionRequest) {
    const { idToken, refreshToken } = model;

    const result = await this.authService.refreshSession(idToken, refreshToken);

    const response = new RefreshSessionResponse(
      result.getAccessToken().getJwtToken(),
      result.getRefreshToken().getToken(),
      result.getIdToken().getJwtToken(),
    );

    return response;
  }

  @Get('/callback')
  @UseGuards(JwtAuthGuard)
  async callback(@AuthUser() user: UserEntity) {
    return user;
  }
}
