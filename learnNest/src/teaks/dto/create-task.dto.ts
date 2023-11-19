import { IsNotEmpty } from 'class-validator';

export class CreateTasksDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
