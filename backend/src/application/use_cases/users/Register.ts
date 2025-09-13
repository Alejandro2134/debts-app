import { User } from '@domain/entities/User';
import { ISecurityUtilsRepository } from '@domain/repositories/SecurityUtilsRepository';
import { IUserRepository } from '@domain/repositories/UserRepository';

export class Register {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly securityUtilsRepository: ISecurityUtilsRepository,
  ) {}

  async execute(item: User) {
    const user = await this.userRepository.getByEmail(item.getEmail());
    if (user) throw new Error('');

    const hash = await this.securityUtilsRepository.generatePasswordHash(
      item.getPassword(),
    );
    item.setPassword(hash);

    return await this.userRepository.create(item);
  }
}
