import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEntityExist, UserEntity } from '../../../core';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getById(id: number) {
    const user = IsEntityExist<UserEntity>(this.userRepo, { id });
    return user;
  }
}
