import {
  BelongsTo,
  Column,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductCategories } from './product_categories.model';

@Table
export class Categories extends Model {
  @Column
  @PrimaryKey
  @BelongsTo(() => ProductCategories)
  id: number;

  @Column
  @NotNull
  name: string;
}
