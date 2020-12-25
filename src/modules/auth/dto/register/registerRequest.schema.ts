import * as Joi from '@hapi/joi';
import { RegisterRequest } from './register.request';

export const RegisterRequestSchema = Joi.object<RegisterRequest>({
  firstName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  phone: Joi.string()
    .min(8)
    .required(),
  countryId: Joi.number()
    .integer()
    .positive()
    .min(1),
});
