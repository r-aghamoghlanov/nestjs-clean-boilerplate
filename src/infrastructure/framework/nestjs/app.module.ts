import { DatabaseModule } from './modules/database.module';
import { InfrastructureModule } from './modules/infrastructure.module';
import { UseCasesModule } from './modules/use-cases.module';
import { AdaptersModule } from './modules/adapters.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config.module';
import { HealthCheckController } from './healthcheck.controller';

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
  controllers: [HealthCheckController],
})
export class AppModule {}
