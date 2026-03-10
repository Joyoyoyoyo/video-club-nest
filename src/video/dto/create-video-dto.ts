import { IsString, IsInt, MinLength, Min, Max } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @MinLength(2, { message: 'Le titre doit faire au moins 2 caractères' })
  title: string;

  @IsInt()
  @Min(1895) // Date du premier film des frères Lumière !
  @Max(new Date().getFullYear() + 5)
  year: number;

  @IsInt()
  @Min(0) // Date du premier film des frères Lumière !
  @Max(1000)
  stock: number;
}