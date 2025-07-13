import { DatabaseModule } from './modules/database.module';
import { RepositoryModule } from './modules/repository.module';
import { UseCasesModule } from './modules/use-cases.module';
import { AdaptersModule } from './modules/adapters.module';
import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthcheck.controller';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { CacheModule } from './modules/cache.module';

@Module({
  imports: [
    DatabaseModule,
    CacheModule,
    RepositoryModule,
    UseCasesModule,
    AdaptersModule,
  ],
  providers: [
    // Register Global validation pipe
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // Register Global exception filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
