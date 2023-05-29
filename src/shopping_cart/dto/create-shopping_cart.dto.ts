import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShoppingCartDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
