import {
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { ProductCategories } from './product_categories.model';
import { ShoppingCart } from './shopping_cart.model';

@Table
export class Product extends Model {
  @Column
  @PrimaryKey
  @BelongsToMany(() => ProductCategories, () => ShoppingCart)
  id: number;

  @Column
  @NotNull
  name: string;

  @Column
  @NotNull
  description: string;

  @Column
  @NotNull
  price: number;

  @Column
  @ForeignKey(() => User)
  owner_id: number;
}
