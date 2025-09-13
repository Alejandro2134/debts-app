import { DebtImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/DebtImplementation';
import { Debt } from '@infrastructure/persistency/orm/sequelize/models/Debt';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DebtsController } from './debts.controller';

@Module({
  controllers: [DebtsController],
  providers: [DebtImplementation],
  imports: [SequelizeModule.forFeature([Debt])],
})
export class DebtsModule {}
