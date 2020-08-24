import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilteredDto } from './dto/get-task-filtered.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { get } from 'lodash';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, userId } = createTaskDto;
    const newTask = new Task();
    newTask.userId = userId;
    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.OPEN;
    await newTask.save();

    return newTask;
  }

  async getTasks(userId: string, filterDto: GetTaskFilteredDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if(search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' , { search: `%${search}%` })
    }

    return query.getMany();
  }

  async updateTask(conditions, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (get(updateTaskDto, 'status') === TaskStatus.DONE) {
      updateTaskDto.completeAt = new Date().toString();
    }

    await this.update(conditions, updateTaskDto);

    return this.findOne(conditions);
  }
}
