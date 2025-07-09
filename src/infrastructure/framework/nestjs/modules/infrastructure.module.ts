import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmModel } from '../../../database/typeorm/models/user.typeorm.model';
import { UserTypeOrmRepository } from '../../../database/typeorm/repositories/user.typeorm.repository';
import { PROVIDER_TOKENS } from './provider-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmModel])],
  providers: [
    {
      useClass: UserTypeOrmRepository,
      provide: PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY,
    },
  ],
  exports: [PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY],
})
export class InfrastructureModule {}
