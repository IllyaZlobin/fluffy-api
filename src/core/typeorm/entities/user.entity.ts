import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Gender, Roles } from '../enums';
import { Country } from '../interfaces';
import { User } from '../interfaces/user.model';
import { AbstractEntity } from './abstract.entity';
import { CountryEntity } from './country.entity';

@Entity('users')
export class UserEntity extends AbstractEntity implements User {
  @Column({ type: 'varchar', nullable: false })
  @Index()
  firstName?: string;

  @Column({ type: 'varchar', nullable: true })
  @Index()
  lastName?: string;

  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  email?: string;

  @Column({ type: 'varchar', nullable: false })
  @Index()
  sub?: string;

  @Column({ type: 'enum', enum: Roles, nullable: false })
  role?: Roles;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'varchar', nullable: false })
  phone?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  zipCode?: string;

  @Column({ type: 'varchar', nullable: true })
  @Index()
  address?: string

  @ManyToOne(
    () => CountryEntity,
    country => country.users,
    {
      cascade: ['insert', 'update'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  country?: Country;
}
