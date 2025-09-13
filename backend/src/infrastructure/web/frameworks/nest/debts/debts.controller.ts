import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
import { GetDebtsFilterDTO } from '@application/dto/GetDebtsDTO';
import { UpdateDebt } from '@application/use_cases/debts/Update';
import { UpdateDebtDTO } from '@application/dto/UpdateDebtDTO';
import { GetById } from '@application/use_cases/debts/GetById';
import { DebtCacheImplementation } from '@infrastructure/persistency/cache/redis/implementations/DebtCacheImplementation';

@Controller('debts')
export class DebtsController {
  private readonly debtMapper = new DebtMapper();
  private readonly createDebtUseCase: CreateDebt;
  private readonly deleteDebtUseCase: DeleteDebt;
  private readonly listDebtsUseCase: ListDebts;
  private readonly updateDebtUseCase: UpdateDebt;
  private readonly getByIdUseCase: GetById;

  constructor(
    debtImplementation: DebtImplementation,
    debtCacheImplementation: DebtCacheImplementation,
  ) {
    this.createDebtUseCase = new CreateDebt(debtImplementation);
    this.deleteDebtUseCase = new DeleteDebt(
      debtImplementation,
      debtCacheImplementation,
    );
    this.listDebtsUseCase = new ListDebts(debtImplementation);
    this.updateDebtUseCase = new UpdateDebt(
      debtImplementation,
      debtCacheImplementation,
    );
    this.getByIdUseCase = new GetById(
      debtImplementation,
      debtCacheImplementation,
    );
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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
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
  async listDebts(
    @Request() req: { user: { sub: number } },
    @Query() query: GetDebtsFilterDTO,
  ) {
    const { sub } = req.user;
    const res = await this.listDebtsUseCase.execute(sub, query);
    return res.map(this.debtMapper.fromDomainToDTOs);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUpdate(
    @Request() req: { user: { sub: number } },
    @Param('id') id: number,
    @Body() debt: UpdateDebtDTO,
  ) {
    const { sub } = req.user;
    const res = await this.updateDebtUseCase.execute(debt, id, sub);
    return this.debtMapper.fromDomainToDTO(res);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(
    @Request() req: { user: { sub: number } },
    @Param('id') id: number,
  ) {
    const { sub } = req.user;
    const res = await this.getByIdUseCase.excute(id, sub);
    return this.debtMapper.fromDomainToDTO(res);
  }
}
