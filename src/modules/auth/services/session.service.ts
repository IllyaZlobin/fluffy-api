import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserEntity, UserSessionEntity } from '../../../core';
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
    remoteAddress: string,
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

  async update(
    session: UserSessionEntity,
  ): Promise<
    { accessToken: string; refreshToken: string } | { accessToken: string }
  > {
    const isExpired = await this.tokenService.checkExpiration(
      session.refreshToken,
    );

    if (isExpired) {
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
    } else {
      const accessToken = await this.tokenService.generateAccess(session.user);

      await this.sessionRepo.save({ ...session, accessToken });

      return { accessToken };
    }
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
}
