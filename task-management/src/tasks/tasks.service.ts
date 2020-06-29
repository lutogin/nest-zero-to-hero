import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const task = this.taskRepository.findOne({ id });

    if(!task) {
      throw new NotFoundException(`Task with id ${id} not found.`)
    }

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find({});
  }

  async getTaskByFilter(status: TaskStatus): Promise<Task[]> {
    return this.taskRepository.find({ status });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  //
  // async updateTask(id: string, taskData: Task): Promise<Task> {
  //   const { title, description, status } = taskData;
  //   const index = this.tasks.findIndex(task => task.id === id);
  //
  //   return this.tasks[index] = {
  //     id,
  //     title: title || this.tasks[index].title,
  //     description: description || this.tasks[index].description,
  //     status: status || this.tasks[index].status,
  //   };
  // }
  //
  // async deleteTask(id: string): Promise<Task> {
  //   const deletedTaskIndex = this.tasks.findIndex(task => task.id === id);
  //   const deletedTaskData = this.tasks.splice(deletedTaskIndex, 1);
  //
  //   return deletedTaskData[0];
  // }

}
