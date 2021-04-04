import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Gender, PetType } from '../enums';
import { Advert, Gallery, Pet, User } from '../interfaces';
import { AbstractEntity } from './abstract.entity';
import { AdvertEntity } from './advert.entity';
import { GalleryEntity } from './gallery.entity';
import { UserEntity } from './user.entity';

@Entity('pets')
export class PetEntity extends AbstractEntity implements Pet {
  @Column({ type: 'varchar', nullable: false })
  @Index()
  name!: string;

  @Column({ type: 'date', nullable: false })
  birthday!: Date;

  @Column({ type: 'varchar', nullable: true })
  @Index()
  photo?: string;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender!: Gender;

  @Column({ type: 'varchar', nullable: false })
  @Index()
  breed!: string;

  @Column({ type: 'varchar', nullable: false })
  @Index()
  color!: string;

  @Column({ type: 'varchar', nullable: false })
  @Index()
  description!: string;

  @Column({ type: 'enum', enum: PetType, nullable: false })
  @Index()
  type!: PetType;

  @Column({ type: 'bool', nullable: false, default: false })
  @Index()
  isLost!: boolean;

  @ManyToOne(
    () => UserEntity,
    user => user.pets,
    {
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  user!: User;

  @OneToMany(
    () => GalleryEntity,
    gallery => gallery.pet,
  )
  gallery?: Gallery[];

  @OneToMany(
    () => AdvertEntity,
    advert => advert.pet,
  )
  adverts?: Advert[];
}
