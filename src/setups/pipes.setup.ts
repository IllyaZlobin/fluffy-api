import { INestApplication } from '@nestjs/common';
import { AuthValidationSchemas } from '../modules/auth/authValidation.schemas';
import { JoiValidationPipe } from '../core/nest/pipes/joiValidation.pipe';

export const setupPipes = async (app: INestApplication) => {
  app.useGlobalPipes(new JoiValidationPipe({ ...AuthValidationSchemas }));
};
