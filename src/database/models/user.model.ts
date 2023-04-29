import { Model, NotNull, PrimaryKey, Unique } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { BelongsToMany } from 'sequelize-typescript';
import { ShoppingCart } from './shopping_cart.model';

@Table
export class User extends Model {
  @Column
  @PrimaryKey
  @BelongsToMany(() => Product, () => ShoppingCart)
  id: number;

  @Column
  @NotNull
  name: string;

  @Column
  @NotNull
  @Unique
  email: string;

  @Column
  @NotNull
  password: string;

  @Column
  @NotNull
  role: string;
}
