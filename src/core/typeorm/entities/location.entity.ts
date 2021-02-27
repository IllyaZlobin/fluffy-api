import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Advert, LocationModel } from '../interfaces';
import { AdvertEntity } from './advert.entity';

@Entity('locations')
export class LocationEntity extends AbstractEntity implements LocationModel {
  @Column({ type: 'varchar', nullable: false })
  latitude!: string;

  @Column({ type: 'varchar', nullable: false })
  longitude!: string;

  @OneToMany(
    () => AdvertEntity,
    advert => advert.location,
  )
  adverts: Advert[];
}
