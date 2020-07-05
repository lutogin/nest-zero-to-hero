import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly id?: string;
}
