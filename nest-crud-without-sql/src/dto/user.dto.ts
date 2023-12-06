import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

// [
//   {
//     name: 'david',
//     id: '1',
//   },
//   {
//     name: 'bill',
//     id: '2',
//   },
// ];
