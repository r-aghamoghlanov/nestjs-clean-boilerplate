/* eslint-disable no-useless-catch */
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../../domain/user.entity';
import type { CreateUserInput } from '../dtos/create-user.dto';
import type { UserResponse } from '../dtos/user-response-dto';
import { MessageCodeError } from '@common/errors/message-code.error';
import { LoggerRegistry } from '@common/logger/logger-registry';

export class CreateUserUseCase {
  private readonly logger = LoggerRegistry.createLogger(CreateUserUseCase.name);

  // Constructor injection - NestJS will provide these dependencies
  constructor(
    private readonly userRepository: IUserRepository, // Interface, not implementation!
  ) {}

  async execute(dto: CreateUserInput): Promise<UserResponse> {
    // STEP 1: Log the operation
    this.logger.info(
      'Creating user',
      { email: dto.email },
      { username: dto.name },
    );

    try {
      // STEP 2: Business rule validation (using injected repository)
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser) {
        throw new MessageCodeError('user:alreadyExists', {
          email: dto.email,
        });
      }

      // STEP 3: Create domain entity (pure business logic)
      const user = new User(null, dto.email, dto.name);

      // STEP 4: Persist using repository (using injected repository)
      const savedUser = await this.userRepository.create(user);

      // STEP 5: Transform to response DTO
      this.logger.info('User created successfully', { userId: savedUser.id });

      return {
        id: savedUser.id!,
        email: savedUser.email,
        name: savedUser.name,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
