import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/bootstrap/services/config.service';
import {
  setupFilters,
  setupInterceptors,
  setupPipes,
  setupSwagger,
} from './setups';

//import * as AWS from 'aws-sdk'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = await app.get(ConfigService);

  setupSwagger(app, 'Fluffy API', 'List of apis', '1.0.0');
  setupFilters(app);
  setupInterceptors(app);
  setupPipes(app);

  const port = configService.isDevelopment
    ? 3100
    : 3000;
  const env = configService.get('env');

  app.enableCors();

  await app.listen(process.env.PORT);

  console.log(`APP RUN ON ${port}, ENV - ${env}`);
}
bootstrap();
