import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail(undefined, { message: 'Invalid email' })
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  readonly password!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  readonly firstName!: string;
}
