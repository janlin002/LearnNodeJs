import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/createTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param() id: string): Promise<TasksEntity> {
    return this._tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this._tasksService.createTask(createTaskDto);
  }
}
