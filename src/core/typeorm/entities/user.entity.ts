import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Gender, Roles } from '../enums';
import { User } from '../interfaces/user.model';
import { AbstractEntity } from './abstract.entity';
import { CountryEntity } from './country.entity';
import * as bcrypt from 'bcrypt';
import { UserSessionEntity } from './userSession.entity';

@Entity('users')
export class UserEntity extends AbstractEntity implements User {
  @Column({ type: 'varchar', nullable: false })
  @Index()
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  @Index()
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, nullable: false })
  role: Roles;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  zipCode: string;

  @Column({ type: 'varchar', nullable: true })
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
