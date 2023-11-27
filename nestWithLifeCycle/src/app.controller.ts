import { Controller, Get, UseGuards, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guard/auth.guard';
import { UserDto } from './dto/userDto';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/:id')
  getUserById(@Query() query: string) {
    console.log(query, 'query');
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.appService.createUser(userDto);
  }
}
