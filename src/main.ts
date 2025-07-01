import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule as NestAppModule } from './infrastructure/framework/nestjs/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ROUTES } from './infrastructure/framework/nestjs/rest/routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(NestAppModule);

  // TODO: Global validation pipe for now, later will be replaced with Zod validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix(ROUTES.MAIN_PATH);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.useBodyParser('json', { limit: '10mb' });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
