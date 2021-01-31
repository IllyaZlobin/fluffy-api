import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CountryEntity,
  IsEntityExist,
  Roles,
  UserEntity,
} from '../../../core/typeorm';
import { Repository } from 'typeorm';
import { LoginRequest } from '../dto/login/login.request';
import { FriendlyHttpException, ValidationException } from 'src/core';
import { RegisterRequest } from '../dto/register/register.request';
import { UserService } from 'src/modules/user/services/user.service';
import {
  AuthenticationDetails,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepo: Repository<CountryEntity>,
    private readonly userService: UserService,
    private cognitoPool: CognitoUserPool,
  ) {}

  async login(model: LoginRequest): Promise<CognitoUserSession> {
    const { email, password } = model;

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const user = new CognitoUser({ Pool: this.cognitoPool, Username: email });

    const result = new Promise((res, rej) => {
      user.authenticateUser(authDetails, {
        onSuccess: result => {
          res(result);
        },
        onFailure: err => {
          rej(err);
        },
      });
    });

    const {
      getAccessToken,
      getIdToken,
      getRefreshToken,
    } = (await result) as CognitoUserSession;

    return new CognitoUserSession({
      AccessToken: getAccessToken(),
      IdToken: getIdToken(),
      RefreshToken: getRefreshToken(),
    });
  }

  async register(model: RegisterRequest) {
    const { email, firstName, password, phone } = model;

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
      throw new FriendlyHttpException(HttpStatus.OK, 'User is already exist');
    } else {
      const attributeList = [];
      attributeList.push(
        new CognitoUserAttribute({ Name: 'name', Value: firstName }),
      );
      attributeList.push(
        new CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
      );
      attributeList.push(
        new CognitoUserAttribute({ Name: 'custom:role', Value: Roles.USER }),
      );

      const cognitoUserSub = new Promise((resolve, reject) => {
        this.cognitoPool.signUp(
          email,
          password,
          attributeList,
          null,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.userSub);
            }
          },
        );
      });

      const sub = (await cognitoUserSub) as string;

      const user = await this.userService.create({
        email,
        firstName,
        phone,
        country,
        sub,
      });

      return user;
    }
  }

  async refreshSession(idToken: string, refreshToken: string) {
    const IdToken = new CognitoIdToken({ IdToken: idToken });
    const RefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    if (!IdToken.payload.email) {
      throw new UnauthorizedException('IdToken is not valid');
    }

    const user = await IsEntityExist<UserEntity>(this.userRepo, {
      email: IdToken.payload.email,
    });

    if (!user) {
      throw new FriendlyHttpException(
        HttpStatus.NOT_FOUND,
        'User is not found',
        ['email'],
      );
    }

    const cognitoUser = new CognitoUser({
      Pool: this.cognitoPool,
      Username: IdToken.payload.email,
    });

    return new Promise<CognitoUserSession>((res, rej) => {
      cognitoUser.refreshSession(RefreshToken, (err, session) => {
        if (err) {
          rej(err);
        }
        res(session);
      });
    });
  }
}
