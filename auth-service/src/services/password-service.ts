import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  private static SALT_ROUNDS = 10;

  static hash(plainPassword: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainPassword, PasswordService.SALT_ROUNDS, (error, theHash) => {
        if (error) return reject(error);

        return resolve(theHash);
      });
    });
  }

  static async compare (plainPassword, theHash): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, theHash, (error, result) => {
        if (error) return reject(error);

        return resolve(result);
      });
    });
  }

  static async generate(passwordLength = 12): Promise<string> {
    return [...Array(passwordLength)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
  };
}
