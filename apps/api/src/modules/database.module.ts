import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from '@package/infrastructure/database/typeorm/datasource/datasource-options';
import { TYPEORM_MODELS } from './models';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...getDataSourceOptions(),
          // Register entities explicitly
          entities: TYPEORM_MODELS,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
