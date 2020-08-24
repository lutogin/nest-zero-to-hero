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

  async getTasks(userId: string): Promise<TaskInterface[]> {
    const { data } = await this.taskClient.get(`/tasks/user/${userId}`);

    return data;
  }

  async getTaskById(id: string, userId: string): Promise<TaskInterface> {
    const { data } = await this.taskClient.get(`/tasks/${id}/user/${userId}`);

    return data;
  }

  async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<TaskInterface> {
    const { data } = await this.taskClient.post('/tasks', { ...createTaskDto, userId});

    return data;
  }

  async updateTask(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<TaskInterface> {
    const { data } = await this.taskClient.patch(`/tasks/${id}/user/${userId}`, updateTaskDto);

    return data;
  }

  async deleteTask(id, userId): Promise<any> {
    const { data } = await this.taskClient.delete(`/tasks/${id}/user/${userId}`);

    return data;
  }
}
