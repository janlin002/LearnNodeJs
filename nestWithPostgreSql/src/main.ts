import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  // const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('Swagger')
    .setDescription('my first nest swagger')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
