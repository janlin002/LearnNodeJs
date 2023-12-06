import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Injectable()
export class AppService {
  private users = [
    {
      name: 'david',
      id: '1',
    },
    {
      name: 'bill',
      id: '2',
    },
  ];

  // READ
  getUserById(id: string): UserDto {
    return this.users.find((user) => user.id === id);
  }

  // DELETE
  deleteUserById(id: string) {
    const found = this.getUserById(id);
    return this.users.filter((task) => task.id !== found.id);
  }
}
