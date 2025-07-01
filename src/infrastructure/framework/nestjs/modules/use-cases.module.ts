import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../user/application/use-cases/create-user.user-case';
import { IUserRepository } from '../../../../user/application/repositories/user.repository.interface';
import { InfrastructureModule } from './infrastructure.module';
import { PROVIDER_TOKENS } from './provider-tokens';

@Module({
  imports: [
    // Import infrastructure to get repository implementations
    InfrastructureModule,
  ],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: [PROVIDER_TOKENS.USER_REPOSITORY],
    },
  ],
  exports: [CreateUserUseCase],
})
export class UseCasesModule {}
