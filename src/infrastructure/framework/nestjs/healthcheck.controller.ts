import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class HealthCheckController {
  constructor() {}

  @Get()
  ping() {
    return { ping: true, message: 'Hello from NestJS User Controller!' };
  }
}
