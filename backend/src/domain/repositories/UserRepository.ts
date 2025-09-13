import { User } from '@domain/entities/User';

export interface IUserRepository {
  create(item: User): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
}
