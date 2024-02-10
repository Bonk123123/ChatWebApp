import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const PORT = process.env.PORT || 5005;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useStaticAssets(join(__dirname, '..', 'src', 'static'));
  app.enableCors({
    origin: ['http://localhost:5021'],
    exposedHeaders: ['set-cookie'],
    credentials: true,
  });
  console.log('server started on port:', PORT);

  await app.listen(PORT);
}

bootstrap();

// tests jest, swagger
