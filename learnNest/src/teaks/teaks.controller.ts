import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeaksService } from './teaks.service';
import { Task } from './teaks.model';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('teaks')
export class TeaksController {
  constructor(private teaksService: TeaksService) {}

  // 舊式寫法
  // @Get()
  // gteAllTasks() {
  //   return this.teaksService.getAllTasks();
  // }

  // search, filter 寫法
  // http://localhost:3000/teaks?status=OPEN&search=123
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Array<Task> {
    if (Object.keys) {
      return this.teaksService.getTasksWithFilter(filterDto);
    } else {
      this.teaksService.getAllTasks();
    }
  }

  // 舊式寫法
  // @Post()
  // createTask(@Body() body): Task {
  //   const { title, description } = body;
  //   return this.teaksService.createTask(title, description);
  // }

  // Dto 寫法
  @Post()
  createTask(@Body() createTasksDto: CreateTasksDto): Task {
    return this.teaksService.createTask(createTasksDto);
  }

  // http://localhost:3000/teaks/[id]
  @Get('/:id')
  getTasksById(@Param() id: string): Task {
    return this.teaksService.getTasksById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param() id: string): Array<Task> {
    return this.teaksService.deleteTaskById(id);
  }

  // http://localhost:3000/teaks/[id]/status
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param() id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.teaksService.updateTaskStatusById(id, status);
  }
}
