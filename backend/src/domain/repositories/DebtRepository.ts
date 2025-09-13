import { Debt } from '@domain/entities/Debt';

export interface IDebtRepository {
  create(item: Debt): Promise<Debt>;
  update(): Promise<Debt>;
  delete(id: number): Promise<void>;
  list(userId: number): Promise<Debt[]>;
  getById(id: number): Promise<Debt | null>;
}
