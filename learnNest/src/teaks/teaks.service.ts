import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './teaks.model';
import { CreateTasksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TeaksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Array<Task> {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      // tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  // 舊式寫法
  // createTask(title: string, description: string): Task {
  //     const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPREN,
  //     };

  //     this.tasks.push(task);
  //     return task;
  // }

  // Dto 寫法
  createTask(createTasksDto: CreateTasksDto): Task {
    const { title, description } = createTasksDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPREN,
    };

    this.tasks.push(task);
    return task;
  }

  getTasksById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): Array<Task> {
    return this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTasksById(id);
    task.status = status;
    return task;
  }
}
