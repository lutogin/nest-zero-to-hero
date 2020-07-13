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

  async getTaskById(id: string): Promise<Task> {
    const task = this.taskRepository.findOne({ id });

    if(!task) {
      throw new NotFoundException(`Task with id ${id} not found.`)
    }

    return task;
  }

  async getTasks(filterDto: GetTaskFilteredDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update({ id }, { ...taskData });
    return this.getTaskById(id);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return this.taskRepository.delete({ id });
  }

}
