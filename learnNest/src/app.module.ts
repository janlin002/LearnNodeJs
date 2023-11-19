import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeaksModule } from './teaks/teaks.module';

@Module({
  imports: [TeaksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
