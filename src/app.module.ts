import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';
import { UserModule } from './modules/user/user.module';
import { AdvertsModule } from './modules/adverts/adverts.module';
import { PetsModule } from './modules/pets/pets.module';

@Module({
  imports: [AuthModule, UserModule, BootstrapModule, AdvertsModule, PetsModule],
})
export class AppModule {}
