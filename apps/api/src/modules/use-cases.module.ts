import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@backend/core/user/application/use-cases/create-user.user-case';
import type { ICacheManager } from '@backend/core/cache/cache-manager.interface';
import type { IUserRepository } from '@backend/core/user/application/repositories/user.repository.interface';
import { CUSTOM_PROVIDER_TOKENS } from './provider-tokens';
import { RepositoryModule } from './repository.module';
import { CacheModule } from './cache-manager.module';

@Module({
  imports: [
    // Import repository module to get repository implementations
    RepositoryModule,
    CacheModule,
  ],
  providers: [
    {
      provide: CUSTOM_PROVIDER_TOKENS.SERVICES.CREATE_USER_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        cacheManager: ICacheManager,
      ) => {
        return new CreateUserUseCase(userRepository, cacheManager);
      },
      inject: [
        CUSTOM_PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY,
        CUSTOM_PROVIDER_TOKENS.CACHE_MANAGER,
      ],
    },
  ],
  exports: [CUSTOM_PROVIDER_TOKENS.SERVICES.CREATE_USER_USE_CASE],
})
export class UseCasesModule {}
