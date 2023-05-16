import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/database/models/product.model';
import { Op } from 'sequelize';
import { Categories } from 'src/database/models/categories.model';

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto, user_id: number) {
    return Product.create(
      {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        seller_id: user_id,
      },
      { raw: true },
    );
  }

  async findAll() {
    return Product.findAll({
      raw: true,
      attributes: ['name', 'description', 'price'],
    });
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
    });
  }

  async findBySeller(seller_id: number) {
    // relate seller with user table
    return Product.findAll({
      where: { seller_id },
      raw: true,
      attributes: ['id', 'name', 'description', 'price'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return Product.update(
      {
        ...updateProductDto,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    );
  }

  async remove(id: number) {
    return Product.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    }).then(() => ({}));
  }
}
