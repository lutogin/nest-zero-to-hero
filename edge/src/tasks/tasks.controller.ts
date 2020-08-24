import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GetUserId } from '../decorators/get-user-id.decorator';
import { GetUser } from '../decorators/get-user.decorator';
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
  async getTasks(
    @GetUserId() userId: string,
  ): Promise<TaskInterface[]> {
    return this.tasksService.getTasks(userId);
  }

  @Get('/:id')
  async getTaskById(
    @GetUserId() userId: string,
    @Param('id') id: string,
  ): Promise<TaskInterface> {
    return this.tasksService.getTaskById(id, userId);
  }

  @Post()
  async crateTask(
    @GetUserId() userId,
    @GetUser() user,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<TaskInterface> {
    return this.tasksService.createTask(createTaskDto, userId);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @GetUserId() userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskInterface> {
    return this.tasksService.updateTask(id, userId, updateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @GetUserId() userId: string,
  ): Promise<any> {
    return this.tasksService.deleteTask(id, userId);
  }
}
