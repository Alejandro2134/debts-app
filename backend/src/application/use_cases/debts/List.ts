import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class ListDebts {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(userId: number) {
    return await this.debtRepository.list(userId);
  }
}
