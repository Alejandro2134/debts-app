import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateDebtDTO {
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'amount can only have 2 decimal places' },
  )
  @Min(0, { message: 'amount cannot be negative' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'creditor must not exceed 100 characters' })
  creditor: string;
}
