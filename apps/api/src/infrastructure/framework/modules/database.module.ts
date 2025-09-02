import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from '@package/infrastructure/database/typeorm/datasource/datasource-options';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...getDataSourceOptions(),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
