import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/user/application/use-cases/create-user.user-case';
import { UserController } from '../../../../user/adapters/controllers/user.controller';
import { NestJSUserController } from '../rest/user.controller';
import { UseCasesModule } from './use-cases.module';
import { PROVIDER_TOKENS } from './provider-tokens';

@Module({
  imports: [
    // Import use cases module to get the use-cases implementation
    UseCasesModule,
  ],
  providers: [
    // Pure presentation controllers
    {
      provide: UserController,
      useFactory: (createUserUseCase: CreateUserUseCase) => {
        return new UserController(createUserUseCase);
      },
      inject: [PROVIDER_TOKENS.SERVICES.CREATE_USER_USE_CASE],
    },
  ],
  controllers: [
    // Only NestJS controllers are registered here
    NestJSUserController,
  ],
})
export class AdaptersModule {}
