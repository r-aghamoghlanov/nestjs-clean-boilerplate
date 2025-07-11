import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@core/user/application/use-cases/create-user.user-case';
import { IUserRepository } from '@core/user/application/repositories/user.repository.interface';
import { InfrastructureModule } from './infrastructure.module';
import { PROVIDER_TOKENS } from './provider-tokens';

@Module({
  imports: [
    // Import infrastructure module to get repository implementations
    InfrastructureModule,
  ],
  providers: [
    {
      provide: PROVIDER_TOKENS.SERVICES.CREATE_USER_USE_CASE,
      useFactory: (userRepository: IUserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: [PROVIDER_TOKENS.REPOSITORIES.USER_REPOSITORY],
    },
  ],
  exports: [PROVIDER_TOKENS.SERVICES.CREATE_USER_USE_CASE],
})
export class UseCasesModule {}
