interface IGetDebtDTO {
  id: number;
  status: string;
  amount: number;
  creditor: string;
}

export class GetDebtDTO {
  id: number;
  status: string;
  amount: number;
  creditor: string;

  constructor(item: IGetDebtDTO) {
    this.id = item.id;
    this.status = item.status;
    this.amount = item.amount;
    this.creditor = item.creditor;
  }
}
