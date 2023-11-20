import { EntityRepository, Repository } from 'typeorm';

import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/createTaskDto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(TasksEntity)
export class TasksRepository extends Repository<TasksEntity> {
  async createTask(createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
