import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilteredDto } from './dto/get-task-filtered.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController{
  constructor(
    private tasksService: TasksService,
  ) {}

  @Get('/user/:userId')
  async getTasks(
    @Query('userId') userId: string,
    @Query() filterDto: GetTaskFilteredDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(userId, filterDto);
  }

  @Get('/:id/user/:userId')
  async getTaskById(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, userId);
  }

  @Post('/')
  async crateTask(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/user/:userId')
  async updateTask(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, userId, updateTaskDto);
  }

  @Delete('/:id/user/:userId')
  async deleteTask(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<DeleteResult> {
    return this.tasksService.deleteTask(id, userId);
  }
}
