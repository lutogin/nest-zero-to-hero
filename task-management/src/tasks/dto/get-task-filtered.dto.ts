import { isNotEmpty, isString } from 'class-validator';
import { TaskStatus } from '../interfaces/task.interface';

export class GetTaskFilteredDto {
  @isNotEmpty()
  @isString()
  status: TaskStatus
}
