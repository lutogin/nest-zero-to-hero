import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { UserRole } from '../user.role.enum';

export class SignUpCredentials {
  @IsEmail()
  email: string;

  @MinLength(5)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
    { message: 'Password to weak' }
  )
  password: string;


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.values(UserRole))
  role: UserRole;
}
