import { IsEnum } from 'class-validator';

import { TaskStatus } from '../teaks.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
