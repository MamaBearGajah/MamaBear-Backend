import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Registered email address', example: 'budi@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Account password', example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
