import { TaskStatus } from '../teaks.model';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
