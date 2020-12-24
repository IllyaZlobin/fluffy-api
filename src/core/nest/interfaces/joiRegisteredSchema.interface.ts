import * as Joi from '@hapi/joi';

export interface JoiRegisteredSchemas {
  [key: string]: Joi.ObjectSchema<any>;
}
