import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmModel } from '../../../database/typeorm/models/user.typeorm.model';
import { PROVIDER_TOKENS } from './provider-tokens';
import { IConfigService } from '../../../../shared/config.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: IConfigService) => {
        const dbConfig = configService.config.database;
        return {
          type: 'postgres', // or 'mysql', 'sqlite', etc.
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,

          // Entities registration
          entities: [UserTypeOrmModel],

          // Auto-sync in development (disable in production!)
          synchronize: process.env.NODE_ENV !== 'production',

          // Logging
          logging: process.env.NODE_ENV === 'development',

          // Connection pool settings
          // extra: {
          //   max: 20, // Maximum number of connections
          //   min: 5,  // Minimum number of connections
          // },
        };
      },
      inject: [PROVIDER_TOKENS.SERVICES.CONFIG_PROVIDER],
    }),
  ],
})
export class DatabaseModule {}
