import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from 'src/core';
import { AuthUser, JwtPayload } from '../../core/nest';
import { UserService } from './services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiUnauthorizedResponse({
    description: 'Return 401 if passed token is not valid',
  })
  @ApiOkResponse({
    description: 'Return user',
    type: UserEntity,
  })
  async getUser(@AuthUser() user: JwtPayload): Promise<UserEntity> {
    const { email, sub } = user;
    const response = this.userService.getUser(email, sub);
    return response;
  }
}
