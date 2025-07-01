// Pure presentation logic - NO FRAMEWORK DEPENDENCIES!
import { CreateUserInput } from '../../application/dto/create-user.dto';
import { UserResponse } from '../../application/dto/user-response-dto';
import { CreateUserUseCase } from '../../application/use-case/create-user.user-case';

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(dto: CreateUserInput): Promise<UserResponse> {
    return this.createUserUseCase.execute(dto);
  }
}
