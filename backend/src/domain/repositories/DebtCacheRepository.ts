import { Debt } from '@domain/entities/Debt';

export interface IDebtCacheRepo {
  setDebtById(id: number, data: Debt): Promise<void>;
  getDebtById(id: number): Promise<Debt | null>;
  deleteDebtById(id: number): Promise<void>;
}
