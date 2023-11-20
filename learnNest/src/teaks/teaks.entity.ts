import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TaskStatus } from './teaks.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
