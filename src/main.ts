import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    // 잘못된 요청 자체를 금지
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
