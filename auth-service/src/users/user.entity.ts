import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PasswordService } from '../services/password-service';
import { UserRole } from './user.role.enum';

@Entity({ name: 'Users' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'text', name: 'name', nullable: true })
  name: string;

  @Column({ type: 'text', name: 'phone', nullable: true })
  phone: string;

  @Column({ type: 'text', name: 'email', nullable: false })
  email: string;

  @Column({ type: 'text', name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column({ type: 'boolean', name: 'is_activated', nullable: false, default: false })
  isActivated: boolean;

  @Column({ type: 'boolean', name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'text', name: 'role', nullable: false, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'timestamp', name: 'last_login_at', default: 'now()' })
  lastLoginAt: number;

  @Column({ type: 'timestamp', name: 'register_at', default: 'now()' })
  registerAt: number;


  async validatePassword(plainPassword: string): Promise<boolean> {
    return PasswordService.compare(plainPassword, this.passwordHash);
  }
}
