import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './services/config.service';
import { S3Service } from './services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.TypeOrmConfig;
      },
      inject: [ConfigService],
      imports: [BootstrapModule],
    }),
  ],
  providers: [ConfigService, S3Service],
  exports: [ConfigService, S3Service],
})
export class BootstrapModule {}
