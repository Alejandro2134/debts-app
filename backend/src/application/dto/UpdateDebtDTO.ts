import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export enum DebtStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

export class UpdateDebtDTO {
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'amount can only have 2 decimal places' },
  )
  @Min(0, { message: 'amount cannot be negative' })
  amount?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'creditor must not exceed 100 characters' })
  creditor?: string;

  @IsOptional()
  @IsEnum(DebtStatus, { message: 'status must be pending or paid' })
  status?: DebtStatus;
}
