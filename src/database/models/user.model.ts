import { Model, PrimaryKey, HasMany, HasOne } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { ShoppingCart } from './shopping_cart.model';

@Table({ tableName: 'Users' })
export class User extends Model {
  @PrimaryKey
  @Column
  @HasMany(() => Product, 'owner_id')
  @HasOne(() => ShoppingCart, 'user_id')
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
}
