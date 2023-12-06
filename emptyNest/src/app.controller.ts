import { Controller, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // DELETE
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.appService.deleteUserById(id);
  }
}
