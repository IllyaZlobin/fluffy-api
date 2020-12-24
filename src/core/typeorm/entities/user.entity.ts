import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Gender, Roles } from '../enums';
import { User } from '../interfaces/user.model';
import { AbstractEntity } from './abstract.entity';
import { CountryEntity } from './country.entity';
import * as bcrypt from 'bcrypt';
import { UserSessionEntity } from './userSession.entity';

@Entity('users')
export class UserEntity extends AbstractEntity implements User {
  @Column({ type: 'varchar' })
  @Index()
  firstName: string;

  @Column({ type: 'varchar' })
  @Index()
  lastName: string;

  @Column({ type: 'varchar' })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  zipCode: string;

  @Column({ type: 'varchar' })
  @Index()
  address;

  @ManyToOne(
    () => CountryEntity,
    country => country.users,
    {
      cascade: ['insert', 'update'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  country: CountryEntity;

  @OneToMany(
    () => UserSessionEntity,
    userSession => userSession.user,
    {
      cascade: ['update', 'insert'],
    },
  )
  sessions: UserSessionEntity[];

  private async generatePassword(password: string) {
    const salt = Number.parseInt(process.env.password_salt);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  async setPassword(password: string) {
    this.password = await this.generatePassword(password);
  }
}
