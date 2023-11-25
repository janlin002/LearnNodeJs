import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/createTaskDto';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/getUser.decorator';
import { Auth } from 'src/auth/auth.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private _tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TasksEntity> {
    return this._tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: Auth,
  ): Promise<TasksEntity> {
    return this._tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): Promise<TasksEntity> {
    return this._tasksService.removeTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<TasksEntity> {
    return this._tasksService.updateTaskStatus(id, status);
  }
}
