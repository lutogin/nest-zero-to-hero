import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly isActivated: boolean;
}
