import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { ShoppingCart } from '../database/models/shopping_cart.model';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class ShoppingCartService {

  @InjectRepository(ShoppingCart)
  private readonly shoppingCartRepository: Repository<ShoppingCart>;

  create(createShoppingCartDto: CreateShoppingCartDto) {
    return 'This action adds a new shoppingCart';
  }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  async findOne(id: string) {
    let ShoppingCart;
    ShoppingCart = await this.shoppingCartRepository.findOne({ where: { id: id } });
    console.log({ShoppingCart});
      // const shoppingCart = this.Sho.find(car => car.id === id);
      // if (!car)
      //     throw new NotFoundException(`Car with id ${id} not found`);
      // return car;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}


