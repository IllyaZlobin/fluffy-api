import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity, UserEntity, UserSessionEntity } from '../../core';
import { ConfigService } from '../bootstrap/services/config.service';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { SessionService } from './services/session.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    BootstrapModule,
    UserModule,
    TypeOrmModule.forFeature([UserEntity, UserSessionEntity, CountryEntity]),
    JwtModule.registerAsync({
      imports: [BootstrapModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: {
          expiresIn: configService.get('jwt_access_expiration'),
          issuer: 'fluffy-api',
        },
      }),
    }),
  ],
  providers: [AuthService, TokenService, SessionService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
