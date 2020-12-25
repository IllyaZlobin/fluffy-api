import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEntityExist, Roles, User, UserEntity } from '../../../core';
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
    await user.setPassword(model.password);
    user.role = Roles.USER;
    user.phone = model.phone;

    const result = await this.userRepo.save(user);

    return result;
  }

  async getById(id: number) {
    const user = IsEntityExist<UserEntity>(this.userRepo, { id });
    return user;
  }
}
