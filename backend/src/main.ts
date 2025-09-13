import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infrastructure/web/frameworks/nest/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@infrastructure/web/frameworks/nest/middlewares/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
