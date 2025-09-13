import { Debt } from '@domain/entities/Debt';
import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class CreateDebt {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(item: Debt, userId: number) {
    item.setUserId(userId);
    return await this.debtRepository.create(item);
  }
}
