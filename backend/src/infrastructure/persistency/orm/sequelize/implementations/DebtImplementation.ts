import { PersistencyError } from '@application/errors/PersistencyError';
import { Debt, IDebtFilter } from '@domain/entities/Debt';
import { IDebtRepository } from '@domain/repositories/DebtRepository';
import { Debt as DebtModel } from '@infrastructure/persistency/orm/sequelize/models/Debt';
import { InjectModel } from '@nestjs/sequelize';

export class DebtImplementation implements IDebtRepository {
  constructor(@InjectModel(DebtModel) private debtModel: typeof DebtModel) {}

  async getById(id: number): Promise<Debt | null> {
    try {
      const debt = await this.debtModel.findOne({ where: { debt_id: id } });

      if (!debt) return null;
      return this.fromModelToDomain(debt);
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error getting debt');
    }
  }

  async create(item: Debt): Promise<Debt> {
    try {
      const model = this.fromDomainToModel(item);
      const createdDebt = await this.debtModel.create(model);
      return this.fromModelToDomain(createdDebt);
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error creating debt');
    }
  }

  async update(item: Debt, id: number): Promise<void> {
    try {
      const model = this.fromDomainToModel(item);
      await this.debtModel.update(model, {
        where: {
          debt_id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error updating debt');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.debtModel.destroy({ where: { debt_id: id } });
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error deleting debt');
    }
  }

  async list(userId: number, query: IDebtFilter): Promise<Debt[]> {
    try {
      const where: { [filter: string]: string | number } = {
        user_id: userId,
      };

      if (query.status) where['status'] = query.status;

      const debts = await this.debtModel.findAll({
        where,
        order: [['debt_id', 'ASC']],
      });

      return debts.map(this.fromModelToDomain);
    } catch (error) {
      console.error(error);
      throw new PersistencyError('Error getting debts');
    }
  }

  private fromDomainToModel(domain: Debt) {
    return {
      status: domain.getStatus(),
      creditor: domain.getCreditor(),
      amount: domain.getAmount().toString(),
      user_id: domain.getUserId(),
    };
  }

  private fromModelToDomain(this: void, model: DebtModel) {
    return new Debt({
      amount: +model.amount,
      creditor: model.creditor,
      status: model.status,
      userId: model.user_id,
      id: model.debt_id,
      createdAt: model.created_at,
    });
  }
}
