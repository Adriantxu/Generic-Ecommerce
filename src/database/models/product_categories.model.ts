import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Categories } from './categories.model';

@Table({ tableName: 'Product_Categories', timestamps: false })
export class ProductCategories extends Model {
  @PrimaryKey
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @PrimaryKey
  @ForeignKey(() => Categories)
  @Column
  category_id: number;
}
