import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from 'src/core';
import { AuthUser, JwtAuthGuard, JwtPayload } from '../../core/nest';
import { UserService } from './services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({
    description: 'Return 401 if passed token is not valid',
  })
  @ApiOkResponse({
    description: 'Return user',
    type: UserEntity,
  })
  async getUser(@AuthUser() user: JwtPayload): Promise<UserEntity> {
    const response = await this.userService.getById(user.id);
    return response;
  }
}
