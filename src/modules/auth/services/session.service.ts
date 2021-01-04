import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  JwtPayload,
  UserEntity,
  UserSessionEntity,
  ValidationException,
} from '../../../core';
import { TokenService } from './token.service';
import * as _ from 'lodash';

@Injectable()
export class SessionService {
  constructor(
    private readonly tokenService: TokenService,
    @InjectRepository(UserSessionEntity)
    private readonly sessionRepo: Repository<UserSessionEntity>,
  ) {}

  async create(
    user: UserEntity,
    remoteAddress?: string,
  ): Promise<UserSessionEntity> {
    const { id } = user;

    const accessToken = await this.tokenService.generateAccess(user);
    const refreshToken = await this.tokenService.generateRefresh(id);

    const session = new UserSessionEntity();
    session.user = user;
    session.accessToken = accessToken;
    session.refreshToken = refreshToken;
    session.remoteAddress = remoteAddress;

    return await this.sessionRepo.save(session);
  }

  //TODO Need reimplement update refresh token logic. Now we are updating both tokens but need to update only access token. Update refresh token only  when it is expired  
  async update(
    session: UserSessionEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = await this.tokenService.generateRefresh(
      session.user.id,
    );
    const accessToken = await this.tokenService.generateAccess(session.user);
    await this.sessionRepo.save({
      ...session,
      accessToken,
      refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async getByUser(user: UserEntity) {
    const [session] = await this.sessionRepo.find({
      where: { user },
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    });
    return session;
  }

  async isEqual(firstToken: string, secondToken: string) {
    return _.isEqual(firstToken, secondToken);
  }

  async checkRefreshToken(token: string): Promise<JwtPayload> {
    const isExist = await this.sessionRepo.findOne({
      where: { refreshToken: Like(`%${token}%`) },
    });

    if (!isExist) {
      throw new ValidationException('Wrong refresh token', ['refreshToken']);
    }
    const isExpired = await this.tokenService.checkExpiration(token);

    if (isExpired) {
      throw new UnauthorizedException('Token is expired');
    }

    const refreshTokenPayload = (await this.tokenService.decodeRefresh(
      token,
    )) as JwtPayload;

    return refreshTokenPayload;
  }
}
