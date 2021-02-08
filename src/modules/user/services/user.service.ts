import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity, IsEntityExist, Roles, User, UserEntity } from '../../../core';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(model: User): Promise<UserEntity> {
    const user = new UserEntity();

    user.firstName = model.firstName;
    user.email = model.email;
    user.country = model.country
    user.role = Roles.USER;
    user.phone = model.phone;
    user.sub = model.sub;

    const result = await this.userRepo.save(user);
    return result;
  }

  async getById(id: number) {
    const user = IsEntityExist<UserEntity>(this.userRepo, { id });
    return user;
  }

  async getUser(email: string, sub?: string): Promise<UserEntity {
    const user = await this.userRepo.findOne({where: {
      email,
      sub,
    }});

    return user;
  }
}
