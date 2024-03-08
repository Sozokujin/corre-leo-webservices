import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  teamMembers: string[]; // IDs des membres de l'équipe
}
