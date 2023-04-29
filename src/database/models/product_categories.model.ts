import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Categories } from './categories.model';

@Table
export class ProductCategories extends Model {
  @Column
  @PrimaryKey
  @ForeignKey(() => Product)
  product_id: number;

  @Column
  @PrimaryKey
  @ForeignKey(() => Categories)
  category_id: number;
}
