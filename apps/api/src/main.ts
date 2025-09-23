import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule as NestAppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ROUTES } from './rest/routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import basicAuth from 'express-basic-auth';
import { PinoLogger } from '@package/infrastructure/logger/pino.logger';
import { LoggerRegistry } from '@backend/core/common/logger/logger-registry';
import { pinoHttp } from 'pino-http';
import { MessageCodeError } from '@backend/core/common/errors/message-code.error';
import { config } from './config';

patchNestJsSwagger();

function setupSwagger(app: NestExpressApplication) {
  const { user: apiDocsUser, password: apiDocsPass } = config.swagger;

  if (!apiDocsUser || !apiDocsPass) {
    throw new MessageCodeError('request:forbidden', {
      message:
        'Swagger UI is enabled but credentials are missing. Please check the .env file. Due to security reasons, the server will not start.',
    });
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
  const pinoLogger = new PinoLogger(config.app.logLevel);
  const logger =
    LoggerRegistry.injectImplementation(pinoLogger).createLogger('main');

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

  if (config.app.enableHttpLogging) {
    app.use(
      pinoHttp({
        logger: pinoLogger.getPinoInstance(),
      }),
    );
  }

  if (config.swagger.enabled) {
    setupSwagger(app);
  }

  await app
    .listen(config.app.port)
    .then(() =>
      logger.info(`Successfully started the server on port ${config.app.port}`),
    )
    .catch((err) => logger.error('Error starting the server', err));
}

void bootstrap();
