import { JoiRegisteredSchemas } from 'src/core';
import { CreatePetRequestSchema } from './dto/create/createPetRequest.schema';

export const PetsValidationSchemas: JoiRegisteredSchemas = {
  CreatePetRequest: CreatePetRequestSchema,
};
