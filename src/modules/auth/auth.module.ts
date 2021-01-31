import { Module, Scope } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity, UserEntity } from '../../core';
import { ConfigService } from '../bootstrap/services/config.service';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { UserModule } from '../user/user.module';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    BootstrapModule,
    UserModule,
    TypeOrmModule.forFeature([UserEntity, CountryEntity]),
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
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    {
      provide: CognitoUserPool,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return new CognitoUserPool({
          UserPoolId: configService.getCognitoConfig.userPoolId,
          ClientId: configService.getCognitoConfig.clientId,
        });
      },
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
