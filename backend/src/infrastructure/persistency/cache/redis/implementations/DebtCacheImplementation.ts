import { PersistencyError } from '@application/errors/PersistencyError';
import { Debt } from '@domain/entities/Debt';
import { IDebtCacheRepo } from '@domain/repositories/DebtCacheRepository';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheDebt } from '../models/Debt';

export class DebtCacheImplementation implements IDebtCacheRepo {
  private readonly characterKeyPrefix = 'debt:id:';

  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  async setDebtById(id: number, data: Debt): Promise<void> {
    try {
      const model = this.fromEntityToModel(data);
      await this.cacheManager.set(
        `${this.characterKeyPrefix}${id}`,
        JSON.stringify(model),
      );
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error setting debt in cache');
    }
  }

  async getDebtById(id: number): Promise<Debt | null> {
    try {
      const value = await this.cacheManager.get<string>(
        `${this.characterKeyPrefix}${id}`,
      );

      return value
        ? this.fromModelToEntity(JSON.parse(value) as ICacheDebt)
        : null;
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error getting debt in cache');
    }
  }

  async deleteDebtById(id: number): Promise<void> {
    try {
      await this.cacheManager.del(`${this.characterKeyPrefix}${id}`);
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error deleting debt from cache');
    }
  }

  fromEntityToModel(entity: Debt): ICacheDebt {
    return {
      amount: entity.getAmount(),
      creditor: entity.getCreditor(),
      id: entity.getId()!,
      status: entity.getStatus(),
      user_id: entity.getUserId()!,
    };
  }

  fromModelToEntity(model: ICacheDebt) {
    return new Debt({
      amount: model.amount,
      creditor: model.creditor,
      id: model.id,
      status: model.status,
      userId: model.user_id,
    });
  }
}
