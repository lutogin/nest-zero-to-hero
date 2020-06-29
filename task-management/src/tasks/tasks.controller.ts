import {Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {TaskRepository} from './task.repository';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController{
  constructor(
    @InjectRepository(TaskRepository)
    private tasksService: TasksService
  ) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Get('/status/:status')
  async getTaskByStatus(@Param('status') status: TaskStatus) {
    return this.tasksService.getTaskByFilter(status);
  }

  @Post()
  async crateTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {

    return this.tasksService.createTask(createTaskDto);
  }

  // @Patch('/:id')
  // async updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): Promise<Task> {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }
  //
  // @Delete('/:id')
  // async deleteTask(@Param('id') id: string): Promise<Task> {
  //   return this.tasksService.deleteTask(id);
  // }

}
