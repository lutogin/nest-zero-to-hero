import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskInterface } from './interfeces/task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService
  ) {}

  @Get('/')
  async getTasks(): Promise<TaskInterface[]> {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskInterface> {
    return this.tasksService.getTaskById(id);
  }

  @Post('/')
  async crateTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskInterface> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskInterface> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<any> {
    return this.tasksService.deleteTask(id);
  }
}