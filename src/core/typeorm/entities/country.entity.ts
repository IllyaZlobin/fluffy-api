import { Column, Entity, Index } from 'typeorm';
import { Country } from '../interfaces';
import { AbstractEntity } from './abstract.entity';

@Entity('countries')
export class CountryEntity extends AbstractEntity implements Country {
  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  name: string;
}
