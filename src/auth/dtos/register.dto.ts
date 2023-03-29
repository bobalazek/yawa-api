import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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

  @ApiProperty()
  @IsOptional()
  readonly timezone!: string;

  @ApiProperty()
  @IsOptional()
  readonly measurementSystem!: string;
}
