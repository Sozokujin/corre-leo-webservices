import { IsNotEmpty, IsString, IsArray, ArrayUnique } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  teamMembers: string[]; // IDs des membres de l'équipe
}
