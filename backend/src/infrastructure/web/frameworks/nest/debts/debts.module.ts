import { DebtImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/DebtImplementation';
import { Debt } from '@infrastructure/persistency/orm/sequelize/models/Debt';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DebtsController } from './debts.controller';
import { DebtCacheImplementation } from '@infrastructure/persistency/cache/redis/implementations/DebtCacheImplementation';

@Module({
  controllers: [DebtsController],
  providers: [DebtImplementation, DebtCacheImplementation],
  imports: [SequelizeModule.forFeature([Debt])],
})
export class DebtsModule {}
