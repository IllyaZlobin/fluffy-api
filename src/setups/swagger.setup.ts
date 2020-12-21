import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (
  app: INestApplication,
  title: string,
  description: string,
  version: string,
  apiUrl = 'api-docs',
  moduleOptions = {},
): void => {
  const options = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
    })
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiUrl, app, document, {
    swaggerOptions: {
      displayRequestDuration: true,
    },
    ...moduleOptions,
  });
};
