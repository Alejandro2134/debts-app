import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { ISecurityUtilsRepository } from '@domain/repositories/SecurityUtilsRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityUtils implements ISecurityUtilsRepository {
  constructor(private jwtService: JwtService) {}

  async generateJWT(payload: { [property: string]: string }): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
