import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateDebtDTO } from '@application/dto/CreateDebtDTO';
import { DebtMapper } from '@application/mappers/DebtMapper';
import { CreateDebt } from '@application/use_cases/debts/Create';
import { DebtImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/DebtImplementation';
import { DeleteDebt } from '@application/use_cases/debts/Delete';
import { ListDebts } from '@application/use_cases/debts/List';

@Controller('debts')
export class DebtsController {
  private readonly debtMapper = new DebtMapper();
  private readonly createDebtUseCase: CreateDebt;
  private readonly deleteDebtUseCase: DeleteDebt;
  private readonly listDebtsUseCase: ListDebts;

  constructor(debtImplementation: DebtImplementation) {
    this.createDebtUseCase = new CreateDebt(debtImplementation);
    this.deleteDebtUseCase = new DeleteDebt(debtImplementation);
    this.listDebtsUseCase = new ListDebts(debtImplementation);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createDebt(
    @Request() req: { user: { sub: number } },
    @Body() debt: CreateDebtDTO,
  ) {
    const { sub } = req.user;
    const debtDomain = this.debtMapper.fromDTOToDomain(debt);
    const res = await this.createDebtUseCase.execute(debtDomain, sub);
    return this.debtMapper.fromDomainToDTO(res);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDebt(
    @Request() req: { user: { sub: number } },
    @Param('id') id: number,
  ) {
    const { sub } = req.user;
    await this.deleteDebtUseCase.execute(sub, id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async listDebts(@Request() req: { user: { sub: number } }) {
    const { sub } = req.user;
    const res = await this.listDebtsUseCase.execute(sub);
    return res.map(this.debtMapper.fromDomainToDTO);
  }
}
