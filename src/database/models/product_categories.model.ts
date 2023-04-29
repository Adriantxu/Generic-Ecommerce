import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class ProductCategories extends Model {
  @Column
  @PrimaryKey
  @ForeignKey()
  product_id: number;

  @Column
  @PrimaryKey
  @ForeignKey()
  category_id: number;
}
