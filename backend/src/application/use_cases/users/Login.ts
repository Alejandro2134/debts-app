import { NotFoundError } from '@application/errors/NotFoundError';
import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { User } from '@domain/entities/User';
import { ISecurityUtilsRepository } from '@domain/repositories/SecurityUtilsRepository';
import { IUserRepository } from '@domain/repositories/UserRepository';

export class Login {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly securityUtilsRepository: ISecurityUtilsRepository,
  ) {}

  async execute(item: User) {
    const user = await this.userRepository.getByEmail(item.getEmail());
    if (!user)
      throw new NotFoundError(`user with email ${item.getEmail()} not found`);

    const isPasswordValid = await this.securityUtilsRepository.comparePassword(
      item.getPassword(),
      user.getPassword(),
    );
    if (!isPasswordValid) throw new UnauthorizedError();

    return await this.securityUtilsRepository.generateJWT({
      sub: user.getId()!,
      email: user.getEmail(),
    });
  }
}
