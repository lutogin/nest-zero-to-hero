import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity({ name: 'Tasks' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'text', name: 'user_id', nullable: false })
  userId: string;

  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'text', name: 'status', nullable: false })
  status: TaskStatus;

  @Column({
    type: 'timestamp without time zone',
    name: 'create_at',
    default: () => 'current_timestamp',
  })
  createAt: string;

  @Column({
    type: 'timestamp without time zone',
    name: 'complete_at',
    default: null,
  })
  completeAt: string;
}
