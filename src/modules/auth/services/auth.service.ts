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
import { FriendlyHttpException, ValidationException } from 'src/core';
import { RegisterRequest } from '../dto/register/register.request';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepo: Repository<CountryEntity>,
    private readonly sessionService: SessionService,
  ) {}

  async login(model: LoginRequest, remoteAddress: string) {
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

  async register(model: RegisterRequest) {
    const country = await IsEntityExist<CountryEntity>(this.countryRepo, {
      id: model.country,
    });

    if (!country) {
      throw new ValidationException('Country is not exist');
    }

    const existedUser = await IsEntityExist<UserEntity>(this.userRepo, {
      email: model.email,
    });

    if (existedUser) {
      return { message: 'User is already exist' };
    } else {
      // TODO Move this logic to user service
      const user = new UserEntity();
      user.firstName = model.firstname;
      user.lastName = model.lastname;
      user.email = model.email;
      await user.setPassword(model.password);
      user.role = model.role;
      user.gender = model.gender;
      user.phone = model.phone;
      user.zipCode = model.zipCode;
      user.address = model.address;
      user.country = country;

      const result = await this.userRepo.save(user);

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
  private async handleUserSession(user: UserEntity, remoteAddress: string) {
    const session = await this.sessionService.getByUser(user);

    if (session) {
      const tokens = await this.sessionService.update(session);
      return tokens;
    }
    const { accessToken, refreshToken } = await this.sessionService.create(
      user,
      remoteAddress,
    );
    return { accessToken, refreshToken };
  }
}
