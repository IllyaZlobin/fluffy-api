import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, TokenType } from 'src/core';
import { ConfigService } from 'src/modules/bootstrap/services/config.service';
import { UserService } from 'src/modules/user/services/user.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt_secret'),
    });
  }

  public async validate(payload: JwtPayload) {
    const { id, type } = payload;

    const user = await this.userService.getById(id);
    const session = await this.sessionService.getByUser(user);

    if (type != TokenType.ACCESS || !user || !session) {
      throw new ForbiddenException('Wrong access token');
    } else {
      return payload;
    }
  }
}
