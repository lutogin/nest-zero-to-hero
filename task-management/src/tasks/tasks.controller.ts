import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilteredDto } from './dto/get-task-filtered.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController{
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    private tasksService: TasksService,
  ) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Get()
  async getTasks(@Query() filterDto: GetTaskFilteredDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Post()
  async crateTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.deleteTask(id);
  }

}
