import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Country } from '../interfaces';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';

@Entity('countries')
export class CountryEntity extends AbstractEntity implements Country {
  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  name: string;

  @OneToMany(
    () => UserEntity,
    user => user.country,
  )
  users: UserEntity[];
}
