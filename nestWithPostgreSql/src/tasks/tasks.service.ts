import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/createTaskDto';
import { TaskStatus } from './task-status.enum';
// import { TasksRepository } from './tasks.reporsitory';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private _tasksRepository: Repository<TasksEntity>,
  ) {}
  async getTaskById(id: string): Promise<TasksEntity> {
    const found = await this._tasksRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    // return this._tasksRepository.createTask(createTaskDto);
    const { title, description } = createTaskDto;

    const task = this._tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this._tasksRepository.save(task);
    return task;
  }
}
