import { Module } from '@nestjs/common';
import { TeaksController } from './teaks.controller';
import { TeaksService } from './teaks.service';

@Module({
  controllers: [TeaksController],
  providers: [TeaksService],
})
export class TeaksModule {}
