import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CountryEntity,
  IsEntityExist,
  UserEntity,
} from '../../../core/typeorm';
import { Repository } from 'typeorm';
import { LoginRequest } from '../dto/login/login.request';
import { SessionService } from './session.service';
import {
  FriendlyHttpException,
  JwtPayload,
  ValidationException,
} from 'src/core';
import { RegisterRequest } from '../dto/register/register.request';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepo: Repository<CountryEntity>,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  async login(
    model: LoginRequest,
    remoteAddress: string,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    const user = await IsEntityExist<UserEntity>(this.userRepo, {
      email: model.email,
    });

    if (user) {
      await this.checkPassword(user, model.password);
      const tokens = await this.handleUserSession(user, remoteAddress);
      return tokens;
    } else {
      throw new FriendlyHttpException('User is not found', ['email']);
    }
  }

  async refreshToken(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    const user = await IsEntityExist<UserEntity>(this.userRepo, {
      email: payload.email,
    });

    const tokens = await this.handleUserSession(user);
    return tokens;
  }

  async register(model: RegisterRequest): Promise<UserEntity> {
    const country = await IsEntityExist<CountryEntity>(this.countryRepo, {
      id: model.countryId,
    });

    if (!country) {
      throw new ValidationException('Country is not exist', ['countryId']);
    }

    const existedUser = await IsEntityExist<UserEntity>(this.userRepo, {
      email: model.email,
    });

    if (existedUser) {
      throw new FriendlyHttpException('User is already exist');
    } else {
      const result = await this.userService.create({ ...model, country });
      return result;
    }
  }

  /**
   *
   * @param password - password from request
   * @description compare user password to passed password
   */
  private async checkPassword(
    user: UserEntity,
    password: string,
  ): Promise<boolean> {
    const isValid = await user.validatePassword(password);

    if (!isValid) {
      throw new FriendlyHttpException('Wrong password', ['password']);
    }
    return isValid;
  }

  /**
   *
   * @param user
   * @param remoteAddress - ip address
   * @description Check if user have a session then update access token. If user don't have a session - create new session and return tokens
   */
  private async handleUserSession(
    user: UserEntity,
    remoteAddress?: string,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    const session = await this.sessionService.getByUser(user);

    if (session) {
      const tokens = await this.sessionService.update(session);
      return tokens;
    } else {
      const { accessToken, refreshToken } = await this.sessionService.create(
        user,
        remoteAddress,
      );
      return { accessToken, refreshToken };
    }
  }
}
