import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { TaskStatus } from './task-status.enum';
import { Auth } from '../auth/auth.entity';

@Entity()
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => Auth, (_user) => _user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: Auth;
}
