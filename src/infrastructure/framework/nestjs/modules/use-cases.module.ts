import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../user/application/use-cases/create-user.user-case';
import { IUserRepository } from '../../../../user/application/repositories/user.repository.interface';
import { InfrastructureModule } from './infrastructure.module';

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
      inject: ['IUserRepository'],
    },
  ],
  exports: [CreateUserUseCase],
})
export class UseCasesModule {}
