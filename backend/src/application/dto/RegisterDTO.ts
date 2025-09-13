import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
