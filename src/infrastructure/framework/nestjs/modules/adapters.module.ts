import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/user/application/use-cases/create-user.user-case';
import { UserController } from '../../../../user/adapters/controllers/user.controller';
import { NestJSUserController } from '../rest/user.controller';
import { UseCasesModule } from './use-cases.module';

@Module({
  imports: [UseCasesModule],
  providers: [
    // Pure presentation controllers
    {
      provide: UserController,
      useFactory: (createUserUseCase: CreateUserUseCase) => {
        return new UserController(createUserUseCase);
      },
      inject: [CreateUserUseCase],
    },

    // NestJS-specific adapters
    {
      provide: NestJSUserController,
      useFactory: (userController: UserController) => {
        return new NestJSUserController(userController);
      },
      inject: [UserController],
    },
  ],
  controllers: [
    // Only NestJS controllers are registered here
    NestJSUserController,
  ],
  exports: [
    // Export pure controllers if other modules need them
    UserController,
  ],
})
export class AdaptersModule {}
