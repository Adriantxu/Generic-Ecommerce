import {
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';

@Table
export class ShoppingCart extends Model {
  @Column
  @PrimaryKey
  @ForeignKey(() => User)
  user_id: number;

  @Column
  @PrimaryKey
  @ForeignKey(() => Product)
  product_id: number;

  @Column
  @NotNull
  quantity: number;
}
