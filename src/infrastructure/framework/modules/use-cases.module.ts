import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@core/user/application/use-cases/create-user.user-case';
import type { ICacheService } from '@core/cache/cache.interface';
import type { IUserRepository } from '@core/user/application/repositories/user.repository.interface';
import { CUSTOM_PROVIDER_TOKENS } from './provider-tokens';
import { RepositoryModule } from './repository.module';
import { CacheModule } from './cache.module';

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
        cacheService: ICacheService,
      ) => {
        return new CreateUserUseCase(userRepository, cacheService);
      },
      inject: [
        CUSTOM_PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY,
        CUSTOM_PROVIDER_TOKENS.CACHE_SERVICE,
      ],
    },
  ],
  exports: [CUSTOM_PROVIDER_TOKENS.SERVICES.CREATE_USER_USE_CASE],
})
export class UseCasesModule {}
