import { Gender, IFile, PetType, UserEntity } from '../../../../core';

export class CreatePetRequest {
  name: string;
  birthday: string;
  gender: Gender;
  breed: string;
  color: string;
  description: string;
  type: PetType;
  isLost: boolean;
  user: UserEntity;
  photo?: IFile

  constructor(
    name: string,
    birthday: string,
    gender: Gender,
    breed: string,
    color: string,
    description: string,
    type: PetType,
    isLost: boolean,
    user: UserEntity,
    photo?: IFile
  ) {
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.breed = breed;
    this.color = color;
    this.description = description;
    this.type = type;
    this.isLost = isLost;
    this.user = user;
    this.photo = photo;
  }
}
