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

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor() {}

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
  async getUser(@AuthUser() user: JwtPayload): Promise<JwtPayload> {
    return user;
  }
}
