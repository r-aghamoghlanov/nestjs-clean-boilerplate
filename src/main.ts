import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule as NestAppModule } from './infrastructure/framework/app.module';
import { VersioningType } from '@nestjs/common';
import { ROUTES } from './infrastructure/framework/rest/routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import basicAuth from 'express-basic-auth';
import { ConfigService } from './infrastructure/config/config.service';
import { PinoLogger } from './infrastructure/logger/pino.logger';
import { LoggerRegistry } from '@common/logger/logger-registry';
import { pinoHttp } from 'pino-http';
import { ConfigRegistry } from '@common/config/config-registry';
import { MessageCodeError } from '@common/errors/message-code.error';

patchNestJsSwagger();

function setupSwagger(app: NestExpressApplication) {
  const { user: apiDocsUser, password: apiDocsPass } =
    ConfigRegistry.config.swaggerConfig;

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
  // Initialize and register global config
  const config = ConfigRegistry.initialize(new ConfigService(process.env));

  // Initialize and register global logger
  const pinoLogger = new PinoLogger(config.appConfig.logLevel);
  const logger = LoggerRegistry.initialize(pinoLogger).createLogger('main');

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

  if (config.appConfig.enableHttpLogging) {
    app.use(
      pinoHttp({
        logger: pinoLogger.getPinoInstance(),
      }),
    );
  }

  if (config.swaggerConfig.enabled) {
    setupSwagger(app);
  }

  await app
    .listen(process.env.PORT ?? 3000)
    .then(() => logger.info('Successfully started the server'))
    .catch((err) => logger.error(err));
}

void bootstrap();
