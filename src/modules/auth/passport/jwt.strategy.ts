import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IsEntityExist, JwtPayload, UserEntity } from 'src/core';
import { ConfigService } from 'src/modules/bootstrap/services/config.service';
import { passportJwtSecret } from 'jwks-rsa';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.getCognitoConfig.authority}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.getCognitoConfig.clientId,
      issuer: configService.getCognitoConfig.authority,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: JwtPayload) {
    const { sub, email } = payload;

    const user = await IsEntityExist<UserEntity>(this.userRepository, {
      sub,
      email,
    });

    if (user && !!payload.sub) {
      return payload;
    } else {
    }
  }
}
