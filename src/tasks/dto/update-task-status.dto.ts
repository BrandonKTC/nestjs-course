import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) // check if status is enum type (enum TaskStatus) in this case
  status: TaskStatus;
}
