import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { ShoppingCart } from 'src/database/models/shopping_cart.model';
import { User } from 'src/database/models/user.model';
import { Product } from 'src/database/models/product.model';

@Injectable()
export class ShoppingCartService {
  checkExistanceCartByUser(user_id: number): Promise<boolean> {
    return ShoppingCart.findOne({
      where: {
        user_id: user_id,
      },
    }).then((res) => !!res);
  }

  addProductToCart(
    user_id: number,
    body: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    return ShoppingCart.create({
      user_id,
      product_id: body.product_id,
      quantity: body.quantity,
    });
  }

  updateProductInCart(
    user_id: number,
    body: CreateShoppingCartDto,
  ): Promise<object> {
    return ShoppingCart.update(
      {
        quantity: body.quantity,
      },
      {
        where: {
          user_id: user_id,
          product_id: body.product_id,
        },
      },
    ).then(() => ({}));
  }

  async getUserShoppingCartAndPrice(id: number) {
    const shoppingCarts = await ShoppingCart.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Product,
          attributes: ['name', 'price'],
        },
      ],
      raw: true,
    });

    shoppingCarts.map((info) => {
      delete info.user_id;
      delete info.product_id;
      info.product['quantity'] = info.quantity;
      delete info.quantity;
      return info;
    });

    const total = shoppingCarts.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);

    return {
      data: shoppingCarts,
      total,
    };
  }

  remove(user_id: number): Promise<object> {
    return ShoppingCart.destroy({
      where: {
        user_id: user_id,
      },
    }).then(() => ({}));
  }
}
