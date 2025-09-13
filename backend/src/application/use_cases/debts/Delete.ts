import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class DeleteDebt {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(userId: number, id: number) {
    const debt = await this.debtRepository.getById(id);
    if (!debt) throw new Error();

    if (debt.getUserId() !== userId) throw new Error();

    await this.debtRepository.delete(id);
  }
}
