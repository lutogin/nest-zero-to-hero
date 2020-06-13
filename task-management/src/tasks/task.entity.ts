import {BaseEntity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {TaskStatus} from './interfaces/task.interface';

export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'text', name: 'status', nullable: false })
  status: TaskStatus;
}
