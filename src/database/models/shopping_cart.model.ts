import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';

@Table({ tableName: 'Shopping_Cart' })
export class ShoppingCart extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  @BelongsTo(() => User, 'id')
  user_id: number;

  @PrimaryKey
  @ForeignKey(() => Product)
  @Column
  @BelongsToMany(() => Product, 'id')
  product_id: number;

  @Column({
    allowNull: false,
  })
  quantity: number;
}
