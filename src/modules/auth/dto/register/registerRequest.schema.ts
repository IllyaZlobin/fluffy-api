import * as Joi from '@hapi/joi';
import { Gender, Roles } from 'src/core';
import { RegisterRequest } from './register.request';

export const RegisterRequestSchema = Joi.object<RegisterRequest>({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  role: Joi.string()
    .valid(...Object.keys(Roles))
    .required(),
  gender: Joi.string()
    .valid(...Object.keys(Gender))
    .required(),
  phone: Joi.string()
    .min(8)
    .required(),
  zipCode: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.number()
    .integer()
    .min(1),
});
