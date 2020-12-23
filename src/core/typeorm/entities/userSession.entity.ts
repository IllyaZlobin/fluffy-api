import { Column, Entity, ManyToOne } from 'typeorm';
import { UserSession } from '../interfaces';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';

@Entity('usersessions')
export class UserSessionEntity extends AbstractEntity implements UserSession {
  @Column({ type: 'varchar', length: 500, nullable: false })
  accessToken: string;
  @Column({ type: 'varchar', length: 500, nullable: false })
  refreshToken: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  remoteAddress: string;

  @ManyToOne(
    () => UserEntity,
    user => user.sessions,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  user: UserEntity;
}
