import { PetEntity } from '../../../../core';

export class CreatePetResponse {
  pet: PetEntity;

  constructor(pet?: PetEntity) {
    this.pet = pet;
  }
}
