import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  teamMembers?: string[]; // IDs des membres de l'équipe à mettre à jour
}
