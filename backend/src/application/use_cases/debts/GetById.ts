import { ConflictError } from '@application/errors/ConflictError';
import { NotFoundError } from '@application/errors/NotFoundError';
import { IDebtCacheRepo } from '@domain/repositories/DebtCacheRepository';
import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class GetById {
  constructor(
    private readonly debtRepository: IDebtRepository,
    private readonly debtCacheRepository: IDebtCacheRepo,
  ) {}

  async excute(id: number, userId: number) {
    const cachedDebt = await this.debtCacheRepository.getDebtById(id);

    if (!cachedDebt) {
      const debt = await this.debtRepository.getById(id);
      if (!debt) throw new NotFoundError(`debt with id ${id} not found`);

      if (debt.getUserId() !== userId)
        throw new ConflictError('You dont have access to the provided debt');

      await this.debtCacheRepository.setDebtById(id, debt);
      return debt;
    }

    if (cachedDebt.getUserId() !== userId)
      throw new ConflictError('You dont have access to the provided debt');

    return cachedDebt;
  }
}
