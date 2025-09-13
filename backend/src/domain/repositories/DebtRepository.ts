import { Debt, IDebtFilter } from '@domain/entities/Debt';

export interface IDebtRepository {
  create(item: Debt): Promise<Debt>;
  update(item: Debt, id: number): Promise<void>;
  delete(id: number): Promise<void>;
  list(userId: number, query: IDebtFilter): Promise<Debt[]>;
  getById(id: number): Promise<Debt | null>;
}
