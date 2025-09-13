interface IDebt {
  id?: number;
  status?: 'pending' | 'paid';
  creditor: string;
  amount: number;
  userId?: number;
}

export class Debt {
  private id?: number;
  private status: 'pending' | 'paid';
  private creditor: string;
  private amount: number;
  private userId?: number;

  constructor(item: IDebt) {
    this.status = item.status || 'pending';
    this.creditor = item.creditor;
    this.amount = item.amount;
    this.id = item.id;
    this.userId = item.userId;
  }

  getStatus() {
    return this.status;
  }

  getCreditor() {
    return this.creditor;
  }

  getAmount() {
    return this.amount;
  }

  getUserId() {
    return this.userId;
  }

  getId() {
    return this.id;
  }

  setUserId(userId: number) {
    this.userId = userId;
  }
}
