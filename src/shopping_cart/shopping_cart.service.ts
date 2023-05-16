import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { ShoppingCart } from 'src/database/models/shopping_cart.model';
import { User } from 'src/database/models/user.model';

@Injectable()
export class ShoppingCartService {
  async create(
    id: number,
    createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    const userExist = await User.findOne({
      where: {
        id: {
          $eq: id,
        },
      },
      raw: true,
    });
    // if its not found throw an error
    if (!userExist) {
      throw new ForbiddenException('Not existent user id.');
    }
    const shoppingCart = ShoppingCart.create({
      user_id: id,
      product_id: createShoppingCartDto.product_id,
      quantity: createShoppingCartDto.quantity,
    });
    return shoppingCart;
  }

  async findOne(id: number) {
    const shoppingCart = await ShoppingCart.findOne({
      where: {
        user_id: {
          $eq: id,
        },
      },
      raw: true,
    });
    if (!shoppingCart)
      throw new ForbiddenException('Not existent Shopping cart id.');
    return shoppingCart;
  }

  update(
    user_id: number,
    id: number,
    updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return ShoppingCart.update(
      { ...updateShoppingCartDto },
      {
        where: {
          user_id: { $eq: user_id },
          product_id: { $eq: id },
        },
      },
    ).then(([affectedRows]) => {
      if (affectedRows === 0) {
        throw new ForbiddenException('Not existent user_id or product id.');
      }
      return affectedRows;
    });
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
