import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TasksEntity } from '../tasks/tasks.entity';

// User

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => TasksEntity, (_task) => _task.user, { eager: true })
  tasks: TasksEntity[];
}
