import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { LoginRequest } from './dto/login/login.request';
import { AuthService } from './services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequest } from './dto/register/register.request';
import { LoginResponse } from './dto/login/login.response';
import { RegisterResponse } from './dto/register/register.response';
import { RefreshSessionRequest } from './dto/refresh/refreshSession.request';
import { RefreshSessionResponse } from './dto/refresh/refreshSession.response';
import { FriendlyHttpException } from 'src/core';

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
      const result = await this.authService.login(model);
      const accessToken = result.getAccessToken().getJwtToken();
      const refreshToken = result.getRefreshToken().getToken();
      const idToken = result.getIdToken().getJwtToken();

      const response = new LoginResponse(accessToken, refreshToken, idToken);

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
}
