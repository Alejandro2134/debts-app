import * as bcrypt from 'bcrypt';

import { ISecurityUtilsRepository } from '@domain/repositories/SecurityUtilsRepository';

export class SecurityUtils implements ISecurityUtilsRepository {
  async generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
