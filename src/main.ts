import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setups';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = await app.get(ConfigService);

  setupSwagger(app, 'Fluffy API', 'List of apis', '1.0.0');

  const port = await configService.get('port');
  const env = await configService.get('env');

  await app.listen(port);

  console.log(`APP RUN ON ${port}, ENV - ${env}`);
}
bootstrap();
