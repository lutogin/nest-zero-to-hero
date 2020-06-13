import {IsOptional, IsString} from 'class-validator';
import { TaskStatus } from '../interfaces/task.interface';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly status: TaskStatus;
}
