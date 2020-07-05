import { UserRole } from '../user.role.enum';

export class SignUpCredentials {
  email: string;
  password: string;
  role?: UserRole;
}
