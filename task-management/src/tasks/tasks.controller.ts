import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilteredDto } from './dto/get-task-filtered.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { get } from 'lodash';

@Controller('tasks')
export class TasksController{
  constructor(
    private tasksService: TasksService,
  ) {}

  @Get('/')
  async getTasks(@Query() filterDto: GetTaskFilteredDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post('/')
  async crateTask(
    @Req()
    req: Request,
    @Body()
    createTaskDto: CreateTaskDto
  ): Promise<Task> {
    const { user } = req;
    console.log('user ---> ', user); // TODO
    return this.tasksService.createTask({ ...createTaskDto, userId: get(user, 'id') });
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
