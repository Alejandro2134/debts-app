import { PersistencyError } from '@application/errors/PersistencyError';
import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/UserRepository';
import { User as UserModel } from '@infrastructure/persistency/orm/sequelize/models/User';
import { InjectModel } from '@nestjs/sequelize';

export class UserImplementation implements IUserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async create(item: User): Promise<User> {
    try {
      const model = this.fromDomainToModel(item);
      const createdUser = await this.userModel.create(model);
      return this.fromModelToDomain(createdUser);
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error creating user');
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({
        where: { email },
      });

      if (!user) return null;
      return this.fromModelToDomain(user);
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error getting user by email');
    }
  }

  private fromDomainToModel(domain: User) {
    return {
      email: domain.getEmail(),
      password: domain.getPassword(),
    };
  }

  private fromModelToDomain(model: UserModel) {
    return new User({
      email: model.email,
      password: model.password,
      id: model.user_id,
    });
  }
}
