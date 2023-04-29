import { Model, NotNull, PrimaryKey, Unique } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  @PrimaryKey
  id: number;

  @Column
  @NotNull
  name: string;

  @Column
  @NotNull
  @Unique
  email: string;

  @Column
  @NotNull
  password: string;

  @Column
  @NotNull
  role: string;
}
