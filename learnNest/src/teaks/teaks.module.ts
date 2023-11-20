import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeaksController } from './teaks.controller';
import { TeaksService } from './teaks.service';
import { TaskRepository } from './teaks.reporsitory';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TeaksController],
  providers: [TeaksService],
})
export class TeaksModule {}
