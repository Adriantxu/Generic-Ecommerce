import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';

@Table({ tableName: 'Shopping_Cart', timestamps: false })
export class ShoppingCart extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @PrimaryKey
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @Column({
    allowNull: false,
  })
  quantity: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  // @HasMany(() => Product, 'product_id')
  // product: Product[];
  @BelongsTo(() => Product, 'product_id')
  product: Product;
}
