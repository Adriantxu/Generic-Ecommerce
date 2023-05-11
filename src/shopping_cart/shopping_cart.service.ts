import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { ShoppingCart } from 'src/database/models/shopping_cart.model';
import { Op } from 'sequelize';
import { User } from 'src/database/models/user.model';

@Injectable()
export class ShoppingCartService {
  async create(
    createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    const userExist = await User.findOne({
      where: {
        id: createShoppingCartDto.user_id,
      },
      raw: true,
    });
    // if its not found throw an error
    if (!userExist) {
      throw new ForbiddenException('Not existent user id.');
    }
    const shoppingCart = ShoppingCart.create({
      user_id: createShoppingCartDto.user_id,
      product_id: createShoppingCartDto.product_id,
      quantity: createShoppingCartDto.quantity,
    });
    return shoppingCart;
  }

  async findOne(id: number) {
    return await ShoppingCart.findOne({
      where: {
        user_id: id,
      },
      raw: true,
    });
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
