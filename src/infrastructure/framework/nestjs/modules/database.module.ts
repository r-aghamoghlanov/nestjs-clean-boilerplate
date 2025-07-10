import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from '../../../database/typeorm/datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getDataSourceOptions(),
    }),
  ],
})
export class DatabaseModule {}
