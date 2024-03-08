import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Veuillez fournir un email valide' })
  readonly email: string;

  @IsString({ message: 'Veuillez fournir un mot de passe' })
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  readonly password: string;
}
