import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ email });
    if (user && user.passwordHash === password) {
      const { passwordHash, ...userFields } = user;

      return userFields;
    }

    return null;
  }
}
