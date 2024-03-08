import { IsEmail, IsNotEmpty, IsString, IsArray, IsOptional, MinLength, MaxLength} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
