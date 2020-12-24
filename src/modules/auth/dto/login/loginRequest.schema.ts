import * as Joi from '@hapi/joi';
import { LoginRequest } from './login.request';

export const LoginRequestSchema = Joi.object<LoginRequest>({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});
