import { IsEnum, IsOptional } from 'class-validator';

interface IGetDebtsDTO {
  id: number;
  creditor: string;
}

export class GetDebtsDTO {
  id: number;
  creditor: string;

  constructor(item: IGetDebtsDTO) {
    this.id = item.id;
    this.creditor = item.creditor;
  }
}

export enum DebtStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

export class GetDebtsFilterDTO {
  @IsOptional()
  @IsEnum(DebtStatus, {
    message: 'status must be pending or paid',
  })
  status?: string;
}
