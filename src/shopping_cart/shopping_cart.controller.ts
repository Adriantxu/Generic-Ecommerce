import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { IdFromJwt } from 'src/middleware/middleware.id';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @IdFromJwt() id: number,
    @Body() createShoppingCartDto: CreateShoppingCartDto,
  ) {
    return this.shoppingCartService.addProductToCart(id, createShoppingCartDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  findOne(@IdFromJwt() user_id: number) {
    return this.shoppingCartService.getUserShoppingCartAndPrice(+user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  update(@IdFromJwt() user_id: number, @Body() body: CreateShoppingCartDto) {
    return this.shoppingCartService.updateProductInCart(user_id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  remove(@IdFromJwt() user_id: number) {
    return this.shoppingCartService.remove(+user_id);
  }
}
