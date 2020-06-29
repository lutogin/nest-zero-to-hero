import { isNotEmpty, isString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilteredDto {
  readonly status: TaskStatus
}
