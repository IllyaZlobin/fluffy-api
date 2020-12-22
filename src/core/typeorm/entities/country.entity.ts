import { Column, Entity, Index } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('countries')
export class Country extends AbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  name: string;
}
