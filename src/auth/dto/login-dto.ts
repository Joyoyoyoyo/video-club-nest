import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Veuillez entrer un email valide' })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  password: string;
}