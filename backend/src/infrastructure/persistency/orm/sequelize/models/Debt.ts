import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'debts' })
export class Debt extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  declare debt_id: number;

  @Column({ allowNull: false, type: DataType.ENUM('pending', 'paid') })
  declare status: 'pending' | 'paid';

  @Column({ allowNull: false })
  declare creditor: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  declare amount: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  declare user_id: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
