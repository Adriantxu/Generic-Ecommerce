import {
  BelongsTo,
  BelongsToMany,
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
import { Categories } from './categories.model';

@Table
export class Product extends Model {
  @PrimaryKey
  @Column
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

  @BelongsToMany(() => Categories, () => ProductCategories)
  categories: Categories[];

  @BelongsTo(() => ShoppingCart, "user_id")
  shopping_carts: ShoppingCart;

  @BelongsTo(() => User, 'owner_id')
  owner: User;
}
