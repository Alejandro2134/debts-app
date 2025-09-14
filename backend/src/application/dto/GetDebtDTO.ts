interface IGetDebtDTO {
  id: number;
  status: string;
  amount: number;
  creditor: string;
  created_at: Date;
}

export class GetDebtDTO {
  id: number;
  status: string;
  amount: number;
  creditor: string;
  created_at: Date;

  constructor(item: IGetDebtDTO) {
    this.id = item.id;
    this.status = item.status;
    this.amount = item.amount;
    this.creditor = item.creditor;
    this.created_at = item.created_at;
  }
}
