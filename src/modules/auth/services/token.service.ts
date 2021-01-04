import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../bootstrap/services/config.service';
import { User, TokenType, isTokenTokenExpired } from '../../../core';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   *
   * @param user
   * @description Generate jwt access token with payload (email, id)
   */
  async generateAccess(user: User): Promise<string> {
    const { id, email } = user;
    const token = await this.jwtService.signAsync({
      id,
      email,
      type: TokenType.ACCESS,
    });
    return token;
  }

  /**
   *
   * @param id - user id
   * @description Generate refresh token for user
   */
  async generateRefresh(id: number): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { id, type: TokenType.REFRESH },
      { expiresIn: this.configService.get('jwt_refresh_expiration') },
    );
    return refreshToken;
  }

  async decodeRefresh(
    token: string,
  ): Promise<
    | string
    | {
        [key: string]: any;
      }
  > {
    const payload = await this.jwtService.decode(token);
    return payload;
  }

  async checkExpiration(token: string): Promise<any> {
    const payload = await this.jwtService.decode(token);
    return await isTokenTokenExpired(payload['exp']);
  }
}
