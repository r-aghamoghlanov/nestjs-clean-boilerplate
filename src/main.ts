import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule as NestAppModule } from './infrastructure/framework/nestjs/app.module';
import { VersioningType } from '@nestjs/common';
import { ROUTES } from './infrastructure/framework/nestjs/rest/routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import basicAuth from 'express-basic-auth';
import { configService } from './infrastructure/config/config.service';
import { PinoLogger } from './infrastructure/logger/pino.logger';
import { LoggerRegistry } from '@shared/logger/logger-registry';
import { pinoHttp } from 'pino-http';

patchNestJsSwagger();

function setupSwagger(app: NestExpressApplication) {
  const { user: apiDocsUser, password: apiDocsPass } =
    configService.swaggerConfig;

  if (!apiDocsUser || !apiDocsPass) {
    throw new Error(
      `Swagger UI is enabled but credentials are missing. Please check the .env file.
      Due to security reasons, the server will not start.`,
    );
  }

  const options = new DocumentBuilder()
    .setTitle('Boilerplate API Project REST Docs')
    .setDescription('REST docs for Boilerplate')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  app.use(
    `/api/docs`,
    basicAuth({
      challenge: true,
      users: {
        [apiDocsUser]: apiDocsPass,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
}

async function bootstrap() {
  const pinoLogger = new PinoLogger(configService.appConfig.logLevel);
  LoggerRegistry.initialize(pinoLogger);

  const app = await NestFactory.create<NestExpressApplication>(NestAppModule);

  app.setGlobalPrefix(ROUTES.MAIN_PATH);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.useBodyParser('json', { limit: '10mb' });

  if (configService.appConfig.enableHttpLogging) {
    app.use(
      pinoHttp({
        logger: pinoLogger.getPinoInstance(),
      }),
    );
  }

  if (configService.swaggerConfig.enabled) {
    setupSwagger(app);
  }

  await app
    .listen(process.env.PORT ?? 3000)
    .then(() => console.log('Successfully started the book-library server'))
    .catch((err) => console.log(err));
}

void bootstrap();
