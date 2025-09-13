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
    if (!user) throw new Error();

    const isPasswordValid = await this.securityUtilsRepository.comparePassword(
      item.getPassword(),
      user.getPassword(),
    );
    if (!isPasswordValid) throw new Error();

    return await this.securityUtilsRepository.generateJWT({
      sub: user.getId()!,
      email: user.getEmail(),
    });
  }
}
