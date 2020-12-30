import { INestApplication } from '@nestjs/common';
import { ApiResponseInterceptor } from '../core/nest';

export const setupInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(new ApiResponseInterceptor());
};
