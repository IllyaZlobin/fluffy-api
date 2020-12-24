import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, BootstrapModule],
})
export class AppModule {}
