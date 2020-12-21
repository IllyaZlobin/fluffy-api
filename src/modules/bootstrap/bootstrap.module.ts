import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Path from 'path';

const { env } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !env
        ? Path.resolve('./env/.local.env')
        : Path.resolve(`./env/.${env}.env`),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('db_host'),
          port: configService.get('db_port'),
          username: configService.get('db_username'),
          password: configService.get('db_password'),
          database: configService.get('db_name'),
          synchronize: false,
          logger: 'simple-console',
        };
      },
    }),
  ],
})
export class BootstrapModule {}
