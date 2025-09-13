import { IDebtFilter } from '@domain/entities/Debt';
import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class ListDebts {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(userId: number, query: IDebtFilter) {
    return await this.debtRepository.list(userId, query);
  }
}
