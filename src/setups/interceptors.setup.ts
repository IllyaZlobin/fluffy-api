import { INestApplication } from '@nestjs/common';

export const setupInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors();
};
