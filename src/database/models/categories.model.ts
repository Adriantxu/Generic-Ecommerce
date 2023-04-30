import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductCategories } from './product_categories.model';

@Table
export class Categories extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @HasMany(() => ProductCategories, 'category_id')
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;
}
