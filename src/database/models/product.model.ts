import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { ProductCategories } from './product_categories.model';
import { ShoppingCart } from './shopping_cart.model';

@Table
export class Product extends Model {
  @PrimaryKey
  @Column
  @HasMany(() => ProductCategories, 'product_id')
  @HasMany(() => ShoppingCart, 'product_id')
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => User)
  @Column
  owner_id: number;
}
