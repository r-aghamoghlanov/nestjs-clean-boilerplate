import { DatabaseModule } from './modules/database.module';
import { InfrastructureModule } from './modules/infrastructure.module';
import { UseCasesModule } from './modules/use-cases.module';
import { AdaptersModule } from './modules/adapters.module';
import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthcheck.controller';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  imports: [
    DatabaseModule,
    InfrastructureModule,
    UseCasesModule,
    AdaptersModule,
  ],
  providers: [
    // Register Global validation pipe
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
