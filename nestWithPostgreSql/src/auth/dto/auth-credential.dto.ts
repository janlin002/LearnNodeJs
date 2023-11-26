import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    minLength: 4,
    maxLength: 20,
    description: '使用者名稱',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is to weak',
  })
  @ApiProperty({
    minLength: 8,
    maxLength: 32,
    description: '使用者密碼',
  })
  password: string;
}
