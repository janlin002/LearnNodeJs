import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/userDto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Worldzz';
  }

  createUser(userDto: UserDto) {
    console.log(userDto, 'userDto');
  }
}
