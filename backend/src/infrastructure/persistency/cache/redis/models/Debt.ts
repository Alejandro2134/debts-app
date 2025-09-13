export interface ICacheDebt {
  id: number;
  status: 'pending' | 'paid';
  creditor: string;
  amount: number;
  user_id: number;
}
