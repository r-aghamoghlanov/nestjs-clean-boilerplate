import { User } from '../../domain/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
}
