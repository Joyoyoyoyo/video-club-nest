import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLoanDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  videoId: number;
}