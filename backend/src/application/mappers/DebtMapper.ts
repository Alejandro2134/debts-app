import { CreateDebtDTO } from '@application/dto/CreateDebtDTO';
import { GetDebtDTO } from '@application/dto/GetDebtDTO';
import { Debt } from '@domain/entities/Debt';

export class DebtMapper {
  fromDTOToDomain(dto: CreateDebtDTO) {
    return new Debt({
      amount: dto.amount,
      creditor: dto.creditor,
    });
  }

  fromDomainToDTO(this: void, domain: Debt) {
    return new GetDebtDTO({
      amount: domain.getAmount(),
      creditor: domain.getCreditor(),
      id: domain.getId()!,
      status: domain.getStatus(),
    });
  }
}
