import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { FriendlyHttpException, PetEntity } from '../../core';
import { Connection, Repository } from 'typeorm';
import { CreatePetRequest } from './dto';
import { S3Service } from '../bootstrap/services/s3.service';
import * as dayjs from 'dayjs';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    private readonly s3Service: S3Service,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(dto: CreatePetRequest): Promise<PetEntity> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const { Location: photo } = await this.s3Service.uploadImage(dto.photo);

      const model = await queryRunner.manager.create(PetEntity, {
        ...dto,
        birthday: dayjs(dto.birthday).toDate(),
        photo,
      });

      const pet = await queryRunner.manager.save(model);

      await queryRunner.commitTransaction();
      return pet;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new FriendlyHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Error with upload: ${err}`,
      );
    }
  }

  async getAll(): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({relations: ['user']});
    return pets;
  }
}
