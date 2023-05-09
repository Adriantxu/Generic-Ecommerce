import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/database/models/product.model';
import { Op } from 'sequelize';
import { Categories } from 'src/database/models/categories.model';

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto) {
    return Product.create(
      {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        seller: createProductDto.seller,
      },
      { raw: true },
    ).then((values) => values);
  }

  async findAll() {
    return Product.findAll({
      raw: true,
      attributes: ['name', 'description', 'price'],
    }).then((values) => values);
  }

  async findByCategory(category: string) {
    return Product.findAll({
      include: [
        {
          model: Categories,
          as: 'categories',
          attributes: ['name'],
        },
      ],
      where: {
        '$categories.name$': {
          [Op.eq]: category,
        },
      },
      raw: true,
      attributes: ['name'],
    }).then((value) => value);
  }

  async findBySeller(seller: string) {
    // relate seller with user table
    return Product.findAll({
      raw: true,
      attributes: ['name'],
    }).then((values) => values);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return Product.update(
      {
        ...UpdateProductDto,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    ).then((value) => value);
  }

  async remove(id: number) {
    return Product.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    }).then((_) => {});
  }
}
