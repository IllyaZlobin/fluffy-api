import { JoiRegisteredSchemas } from '../../core';
import { LoginRequestSchema } from './dto/login/loginRequest.schema';
import { RegisterRequestSchema } from './dto/register/registerRequest.schema';

export const AuthValidationSchemas: JoiRegisteredSchemas = {
  RegisterRequest: RegisterRequestSchema,
  LoginRequest: LoginRequestSchema,
};
