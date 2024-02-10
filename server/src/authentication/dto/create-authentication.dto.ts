import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthenticationDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
