import { IsEmail, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
