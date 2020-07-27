import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { TASK_MANAGEMENT_URL } from '../../config/module.config';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskInterface } from './interfeces/task.interface';

@Injectable()
export class TasksService {
  private taskClient: AxiosInstance;
  constructor() {
    this.taskClient = axios.create({
      baseURL: TASK_MANAGEMENT_URL,
    })
  }

  async getTasks(): Promise<TaskInterface[]> {
    const { data } = await this.taskClient.get('/tasks');

    return data;
  }

  async getTaskById(id: string): Promise<TaskInterface> {
    const { data } = await this.taskClient.get(`/tasks/${id}`);

    return data;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskInterface> {
    const { data } = await this.taskClient.post('/tasks', createTaskDto);

    return data;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskInterface> {
    const { data } = await this.taskClient.patch(`/tasks/${id}`, updateTaskDto);

    return data;
  }

  async deleteTask(id): Promise<any> {
    const { data } = await this.taskClient.delete(`/tasks/${id}`);

    return data;
  }
}
