import { ConflictError } from '@application/errors/ConflictError';
import { NotFoundError } from '@application/errors/NotFoundError';
import { IUpdateDebt } from '@domain/entities/Debt';
import { IDebtCacheRepo } from '@domain/repositories/DebtCacheRepository';
import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class UpdateDebt {
  constructor(
    private readonly debtRepository: IDebtRepository,
    private readonly debtCacheRepository: IDebtCacheRepo,
  ) {}

  async execute(item: IUpdateDebt, id: number, userId: number) {
    const debt = await this.debtRepository.getById(id);
    if (!debt) throw new NotFoundError(`debt with id ${id} not found`);

    if (debt.getUserId() !== userId)
      throw new ConflictError('You dont have access to the provided debt');

    if (item.amount) debt.setAmount(item.amount);
    if (item.creditor) debt.setCreditor(item.creditor);
    if (item.status) {
      if (debt.getStatus() === 'paid' && item.status === 'pending')
        throw new ConflictError('Paid debt cant be updated to pending');

      debt.setStatus(item.status as 'pending' | 'paid');
    }

    await this.debtRepository.update(debt, id);
    await this.debtCacheRepository.deleteDebtById(id);

    return debt;
  }
}
