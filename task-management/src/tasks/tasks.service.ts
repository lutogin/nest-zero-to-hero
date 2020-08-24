import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilteredDto } from './dto/get-task-filtered.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: string, userId: string): Promise<Task> {
    const task = this.taskRepository.findOne({ id, userId });

    if(!task) {
      throw new NotFoundException(`Task with id ${id} not found.`)
    }

    return task;
  }

  async getTasks(userId: string, filterDto: GetTaskFilteredDto): Promise<Task[]> {
    return this.taskRepository.getTasks(userId, filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(id: string, userId: string, taskData: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.updateTask({ id, userId }, { ...taskData });

    return this.getTaskById(id, userId);
  }

  async deleteTask(id: string, userId: string): Promise<DeleteResult> {
    return this.taskRepository.delete({ id, userId });
  }

}
