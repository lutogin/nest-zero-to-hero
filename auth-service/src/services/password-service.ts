import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SECRET } from '../../config/module.config';

@Injectable()
export class PasswordService {
  static async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SECRET);
  }

  static async compare (plainPassword, hash): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }

  static async generate(passwordLength = 12): Promise<string> {
    return [...Array(passwordLength)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
  };
}
