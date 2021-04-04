import * as Joi from '@hapi/joi';
import { Gender, PetType } from '../../../../core';
import { CreatePetRequest } from './createPet.request';

export const CreatePetRequestSchema = Joi.object<CreatePetRequest>({
  name: Joi.string().required(),
  birthday: Joi.string()
    .regex(RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)).message('Required format YYYY-MM-DD')
    .required(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required(),
  breed: Joi.string().required(),
  color: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(PetType))
    .required(),
  isLost: Joi.boolean().required(),
  user: Joi.object().optional(),
});
