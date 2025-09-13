export interface ISecurityUtilsRepository {
  generatePasswordHash(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
