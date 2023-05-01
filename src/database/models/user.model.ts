import { Model, PrimaryKey, HasMany, HasOne, AutoIncrement } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { ShoppingCart } from './shopping_cart.model';

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
  })
  role: string;

  @HasMany(() => Product, 'owner_id')
  products: Product[];

  @HasOne(() => ShoppingCart, 'user_id')
  shopping_cart: ShoppingCart;
}
