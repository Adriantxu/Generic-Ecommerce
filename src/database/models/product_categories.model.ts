import {
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Categories } from './categories.model';

@Table({ tableName: 'Product_Categories' })
export class ProductCategories extends Model {
  @PrimaryKey
  @Column
  @ForeignKey(() => Product)
  @BelongsToMany(() => Product, 'id')
  product_id: number;

  @PrimaryKey
  @Column
  @ForeignKey(() => Categories)
  @BelongsToMany(() => Categories, 'id')
  category_id: number;
}
