import { ConflictError } from '@application/errors/ConflictError';
import { NotFoundError } from '@application/errors/NotFoundError';
import { IDebtCacheRepo } from '@domain/repositories/DebtCacheRepository';
import { IDebtRepository } from '@domain/repositories/DebtRepository';

export class DeleteDebt {
  constructor(
    private readonly debtRepository: IDebtRepository,
    private readonly debtCacheRepository: IDebtCacheRepo,
  ) {}

  async execute(userId: number, id: number) {
    const debt = await this.debtRepository.getById(id);
    if (!debt) throw new NotFoundError(`debt with id ${id} not found`);

    if (debt.getUserId() !== userId)
      throw new ConflictError('You dont have access to the provided debt');

    await this.debtRepository.delete(id);
    await this.debtCacheRepository.deleteDebtById(id);
  }
}
