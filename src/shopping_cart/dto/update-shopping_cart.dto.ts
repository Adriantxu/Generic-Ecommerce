import { IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

export class UpdateShoppingCartDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

}
