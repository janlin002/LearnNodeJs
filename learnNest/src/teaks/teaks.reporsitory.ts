import { EntityRepository, Repository } from 'typeorm';

import { Task } from './teaks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
