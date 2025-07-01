import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../entities/user.typeorm.entity';
import { User } from '../../../../user/domain/user.entity';
import { IUserRepository } from '../../../../user/application/repository/user.repository.interface';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.toEntity(user);
    const saved = await this.userRepository.save(entity);
    return this.toDomain(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: UserTypeOrmEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toEntity(user: User): UserTypeOrmEntity {
    const entity = new UserTypeOrmEntity();

    if (user.isPersistent) {
      entity.id = user.getId()!;
    }

    entity.email = user.getEmail();
    entity.name = user.getName();
    entity.createdAt = user.getCreatedAt();
    entity.updatedAt = user.getUpdatedAt();
    return entity;
  }
}
