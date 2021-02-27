import { Column, Entity, ManyToOne } from 'typeorm';
import { AdvertStatus } from '../enums';
import { Advert, Pet, User, LocationModel } from '../interfaces';
import { AbstractEntity } from './abstract.entity';
import { LocationEntity } from './location.entity';
import { PetEntity } from './pet.entity';
import { UserEntity } from './user.entity';

@Entity('adverts')
export class AdvertEntity extends AbstractEntity implements Advert {
  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @Column({ type: 'enum', enum: AdvertStatus, nullable: false })
  status!: AdvertStatus;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @ManyToOne(
    () => LocationEntity,
    location => location.adverts,
    {
      cascade: ['insert', 'update', 'remove', 'soft-remove'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  location!: LocationModel;

  @ManyToOne(
    () => UserEntity,
    user => user.adverts,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  user!: User;

  @ManyToOne(
    () => PetEntity,
    pet => pet.adverts,
    {
      cascade: ['insert', 'remove', 'soft-remove', 'update'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  pet!: Pet;
}
