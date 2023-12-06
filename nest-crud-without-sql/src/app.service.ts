import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AppService {
  private array = [
    {
      name: 'david',
      id: '1',
    },
    {
      name: 'bill',
      id: '2',
    },
  ];

  // CREATE
  createUser(userDto: UserDto): UserDto {
    this.array.push(userDto);
    return userDto;
  }

  // READ
  getAllUsers(): Array<UserDto> {
    return this.array;
  }

  getUserById(id: string): UserDto {
    console.log(id, 'id');
    return this.array.find((user) => user.id === id);
  }

  // UPDATE
  updateUserById(id: string, name: string): UserDto {
    const updateItem = this.getUserById(id);
    updateItem.name = name;
    return updateItem;
  }

  // DELETE
  deleteUserById(id: string) {
    const found = this.getUserById(id);
    return this.array.filter((task) => task.id !== found.id);
  }
}

// download class-validator
