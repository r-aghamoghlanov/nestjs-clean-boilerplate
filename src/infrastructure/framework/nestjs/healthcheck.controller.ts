import { Controller, Get } from '@nestjs/common';
import { ROUTES } from './rest/routes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check Endpoints')
@Controller(ROUTES.HEALTHCHECK.MAIN)
export class HealthCheckController {
  constructor() {}

  @Get()
  ping() {
    return { ping: true, message: 'Hello from NestJS!' };
  }
}
