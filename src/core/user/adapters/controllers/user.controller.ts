// Pure presentation logic - NO FRAMEWORK DEPENDENCIES!
import { CreateUserInput } from '../../application/dtos/in/create-user.dto';
import { UserResponse } from '../../application/dtos/out/user-response-dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.user-case';

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(dto: CreateUserInput): Promise<UserResponse> {
    return this.createUserUseCase.execute(dto);
  }
}
