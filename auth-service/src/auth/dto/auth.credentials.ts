import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { UserRole } from '../../users/user.role.enum';

export class AuthCredentials {
  @IsEmail()
  email: string;

  @MinLength(5)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
    { message: 'Password to weak.' }
  )
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
