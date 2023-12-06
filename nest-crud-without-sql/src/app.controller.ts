import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // CREATE
  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.appService.createUser(userDto);
  }
  // READ
  @Get()
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  // http://localhost:3000/1
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }

  // UPDATE
  @Patch('/:id')
  updateUserById(@Param('id') id: string, @Body() userName: { name: string }) {
    const { name } = userName;
    return this.appService.updateUserById(id, name);
  }

  // DELETE
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.appService.deleteUserById(id);
  }
}
