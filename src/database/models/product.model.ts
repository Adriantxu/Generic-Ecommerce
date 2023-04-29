import {
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Product extends Model {
  @Column
  @PrimaryKey
  id: number;

  @Column
  @NotNull
  name: string;

  @Column
  @NotNull
  description: string;

  @Column
  @NotNull
  price: number;

  @Column
  @ForeignKey()
  owner_id: number;
}
