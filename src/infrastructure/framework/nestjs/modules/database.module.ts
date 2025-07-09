import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserTypeOrmModel } from '../../../database/typeorm/models/user.typeorm.model';
import { PROVIDER_TOKENS } from './provider-tokens';
import { IConfigService } from '../../../../shared/config.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: IConfigService) => {
        const dbConfig = configService.dbConfig;
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,

          // Entities registration
          entities: [
            __dirname + '/../../../database/typeorm/models/*.model.{ts,js}',
          ],

          // Auto-sync in development (disable in production!)
          synchronize: dbConfig.synchronizeModels,

          // Logging
          logging: dbConfig.enableQueryLogging,

          // Connection pool settings
          extra: {
            max: 10,
            min: 2,
          },
        };
      },
      inject: [PROVIDER_TOKENS.SERVICES.CONFIG_PROVIDER],
    }),
  ],
})
export class DatabaseModule {}
