import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTypeOrmModel } from '../../../database/typeorm/models/user.typeorm.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // or 'mysql', 'sqlite', etc.
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', undefined),
        database: configService.get('DB_NAME', 'postgres'),

        // Entities registration
        entities: [UserTypeOrmModel],

        // Auto-sync in development (disable in production!)
        synchronize: configService.get('NODE_ENV') !== 'production',

        // Logging
        logging: configService.get('NODE_ENV') === 'development',

        // Connection pool settings
        // extra: {
        //   max: 20, // Maximum number of connections
        //   min: 5,  // Minimum number of connections
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
