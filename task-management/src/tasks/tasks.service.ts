import { Injectable } from '@nestjs/common';
import { GetTaskFilteredDto } from './dto/get-task-filtered.dto';
import { Task, TaskStatus } from './interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getTaskById(id: string): Promise<Task> {
    return this.tasks.find(task => task.id === id);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskByFilter(status: TaskStatus): Promise<Task[]> {
    return this.tasks.filter(task => task.status === status);
  }

  async createTask(taskData: Task): Promise<Task> {
    const { title, description } = taskData;
    const newTaskData = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTaskData);

    return newTaskData;
  }

  async updateTask(id: string, taskData: Task): Promise<Task> {
    const { title, description, status } = taskData;
    const index = this.tasks.findIndex(task => task.id === id);

    return this.tasks[index] = {
      id,
      title: title || this.tasks[index].title,
      description: description || this.tasks[index].description,
      status: status || this.tasks[index].status,
    };
  }

  async deleteTask(id: string): Promise<Task> {
    const deletedTaskIndex = this.tasks.findIndex(task => task.id === id);
    const deletedTaskData = this.tasks.splice(deletedTaskIndex, 1);

    return deletedTaskData[0];
  }

}
