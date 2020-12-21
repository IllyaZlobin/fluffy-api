import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';

@Module({
  imports: [AuthModule, BootstrapModule],
})
export class AppModule {}
