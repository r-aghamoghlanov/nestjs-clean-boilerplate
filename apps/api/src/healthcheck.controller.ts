import { Controller, Get } from '@nestjs/common';
import { ROUTES } from './rest/routes';
import { ApiTags } from '@nestjs/swagger';
import { LoggerRegistry } from '@backend/core/common/logger/logger-registry';

@ApiTags('Health Check Endpoints')
@Controller(ROUTES.HEALTHCHECK.MAIN)
export class HealthCheckController {
  private readonly logger = LoggerRegistry.createLogger(
    HealthCheckController.name,
  );

  @Get()
  ping() {
    this.logger.info('Pinging health check endpoint');
    return { ping: true, message: 'Hello from NestJS!' };
  }
}
