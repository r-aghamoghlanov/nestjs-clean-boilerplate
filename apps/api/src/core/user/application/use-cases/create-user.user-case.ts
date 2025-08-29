import type { IUserRepository } from '../repositories/user.repository.interface';
import type { CreateUserInput } from '../dtos/in/create-user.dto';
import type { UserResponse } from '../dtos/out/user-response-dto';
import type { ICacheManager } from '@core/cache/cache-manager.interface';
import { CacheType } from '@core/cache/cache-manager.interface';
import { MessageCodeError } from '@common/errors/message-code.error';
import { LoggerRegistry } from '@common/logger/logger-registry';
import { User } from '../../domain/user.entity';
import { ICacheService } from '@core/cache/cache.interface';

export class CreateUserUseCase {
  private readonly logger = LoggerRegistry.createLogger(CreateUserUseCase.name);
  private readonly cache: ICacheService;

  // Interfaces, not implementations!
  // Constructor injection - NestJS will provide these dependencies
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cacheManager: ICacheManager,
  ) {
    this.cacheManager.setType(CacheType.PERSISTENT);
    this.cache = this.cacheManager.getCacheService();
  }

  async execute(dto: CreateUserInput): Promise<UserResponse> {
    // STEP 1: Log the operation
    this.logger.info(
      'Creating user',
      { email: dto.email },
      { username: dto.name },
    );

    // Check cache first for fast access
    const cachedUser = await this.cache.get<UserResponse>(dto.email);

    if (cachedUser) {
      this.logger.info('User found in cache', {
        userId: cachedUser.id,
      });
      return cachedUser;
    }

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

    // STEP 5: Cache the user
    await this.cache.set(savedUser.email, { id: savedUser.id }, 300);

    // STEP 6: Transform to response DTO
    this.logger.info('User created successfully', { userId: savedUser.id });

    return {
      id: savedUser.id!,
      email: savedUser.email,
      name: savedUser.name,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }
}
