import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// Cant use it due to changes inside JEST tests code
export class SendEmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
