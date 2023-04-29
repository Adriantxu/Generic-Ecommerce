import {
  Column,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Categories extends Model {
  @Column
  @PrimaryKey
  id: number;

  @Column
  @NotNull
  name: string;
}
