import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShoppingCartDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  quantity: number;
}
