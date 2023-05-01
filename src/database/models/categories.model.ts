import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductCategories } from './product_categories.model';
import { Product } from './product.model';

@Table({ tableName: 'Categories', timestamps: false })
export class Categories extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Product, () => ProductCategories)
  products: Product[];
}
