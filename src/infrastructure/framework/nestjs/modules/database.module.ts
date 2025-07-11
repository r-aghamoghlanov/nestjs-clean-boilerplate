import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from '@database/typeorm/datasource';
import { PROVIDER_TOKENS } from './provider-tokens';
import { UserTypeOrmRepository } from '@database/typeorm/repositories/user.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getDataSourceOptions(),
    }),
  ],
})
export class DatabaseModule {}
