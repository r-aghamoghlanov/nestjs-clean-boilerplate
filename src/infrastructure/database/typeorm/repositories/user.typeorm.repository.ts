import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeOrmModel } from '../models/user.typeorm.model';
import { User } from '../../../../user/domain/user.entity';
import { IUserRepository } from '../../../../user/application/repositories/user.repository.interface';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmModel)
    private readonly userRepository: Repository<UserTypeOrmModel>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.toModel(user);
    const saved = await this.userRepository.save(entity);
    return this.toDomain(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async getAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: UserTypeOrmModel): User {
    return new User(
      entity.id,
      entity.email,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toModel(user: User): UserTypeOrmModel {
    const entity = new UserTypeOrmModel();

    if (user.isPersistent) {
      entity.id = user.id!;
    }

    entity.email = user.email;
    entity.name = user.name;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
}
