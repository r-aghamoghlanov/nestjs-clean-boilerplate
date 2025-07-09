import { DatabaseModule } from './modules/database.module';
import { InfrastructureModule } from './modules/infrastructure.module';
import { UseCasesModule } from './modules/use-cases.module';
import { AdaptersModule } from './modules/adapters.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config.module';
import { HealthCheckController } from './healthcheck.controller';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    // Configuration module (global)
    ConfigModule,

    // Database configuration
    DatabaseModule,

    // Core application modules
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
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
