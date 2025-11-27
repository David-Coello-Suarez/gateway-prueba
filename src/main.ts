import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Gateway service');

  const app = await NestFactory.create(AppModule);
  // Prefijo global
  app.setGlobalPrefix('api');

  // Validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  logger.log(`Gateway started on port ${port}`);
}
bootstrap();
