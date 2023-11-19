import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 須加這行 pipe 才會生效
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
