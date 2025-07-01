import { IUserRepository } from '../repository/user.repository.interface';
import { User } from '../../domain/user.entity';
import type { CreateUserInput } from '../dto/create-user.dto';
import type { UserResponse } from '../dto/user-response-dto';

export class CreateUserUseCase {
  // Constructor injection - NestJS will provide these dependencies
  constructor(
    private readonly userRepository: IUserRepository, // Interface, not implementation!
  ) {}

  async execute(dto: CreateUserInput): Promise<UserResponse> {
    // STEP 1: Log the operation
    console.log('Creating user', { email: dto.email });

    try {
      // STEP 2: Business rule validation (using injected repository)
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // STEP 3: Create domain entity (pure business logic)
      const user = new User(null, dto.email, dto.name);

      // STEP 4: Persist using repository (using injected repository)
      const savedUser = await this.userRepository.create(user);

      // STEP 5: Transform to response DTO
      console.log('User created successfully', { userId: savedUser.getId() });

      return {
        id: savedUser.getId()!,
        email: savedUser.getEmail(),
        name: savedUser.getName(),
        createdAt: savedUser.getCreatedAt(),
        updatedAt: savedUser.getUpdatedAt(),
      };
    } catch (error) {
      console.error('Failed to create user', error);
      throw error;
    }
  }
}
