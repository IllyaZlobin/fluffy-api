import { Column, Entity, ManyToOne } from 'typeorm';
import { Gallery, Pet } from '../interfaces';
import { AbstractEntity } from './abstract.entity';
import { PetEntity } from './pet.entity';

@Entity('gallery')
export class GalleryEntity extends AbstractEntity implements Gallery {
  @Column({ type: 'varchar', nullable: false })
  photoUrl!: string;

  @ManyToOne(
    () => PetEntity,
    pet => pet.gallery,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      cascade: ['insert', 'update', 'remove'],
      nullable: false,
    },
  )
  pet!: Pet;
}
