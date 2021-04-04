import { Pet } from '../../../../core';

export class GeTallPetsResponse {
  pets: Pet[];

  constructor(pets?: Pet[]) {
    this.pets = pets;
  }
}
