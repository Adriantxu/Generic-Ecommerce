import {
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  @PrimaryKey
  @ForeignKey()
  user_id: number;

  @Column
  @PrimaryKey
  @ForeignKey()
  product_id: number;

  @Column
  @NotNull
  quantity: number;
}
