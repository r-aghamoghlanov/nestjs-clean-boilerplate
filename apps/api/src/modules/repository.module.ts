import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserTypeOrmModel,
  UserRepository,
} from '@package/infrastructure/database/typeorm/models/user.typeorm.model';
import { UserTypeOrmRepository } from '@package/infrastructure/database/typeorm/repositories/user.typeorm.repository';
import {
  CUSTOM_PROVIDER_TOKENS,
  TYPEORM_MODELS_REPOSITORY_TOKENS,
} from './provider-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmModel])],
  providers: [
    {
      provide: CUSTOM_PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY,
      useFactory: (userRepository: UserRepository) => {
        return new UserTypeOrmRepository(userRepository);
      },
      inject: [TYPEORM_MODELS_REPOSITORY_TOKENS.USER_REPOSITORY],
    },
  ],
  exports: [CUSTOM_PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY],
})
export class RepositoryModule {}
