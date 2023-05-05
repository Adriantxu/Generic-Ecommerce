/* eslint-disable prettier/prettier */
import { Model, PrimaryKey, HasMany, HasOne } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { ShoppingCart } from './shopping_cart.model';
import { BadRequestException } from '@nestjs/common';

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model {
  static userRoles = {
    'owner': 0,
    'seller': 1,
  };

  static setUserRole(role: string): number | BadRequestException {
    for (const key in User.userRoles) {
      if (key === role) return User.userRoles[key];
    }
    throw new BadRequestException(
      'The role you tried to implement is not valid.',
    );
  }

  static getUserRole(role: number): string {
    const reversedObj = User.reverseRoles();
    console.log('Role: ', role, ' is equal to: ', reversedObj[role]);
    if (!reversedObj[role])
      throw new BadRequestException(
        'Something went terribly wrong. Contact the administrators.',
      );
    return reversedObj[role];
  }

  private static reverseRoles(): object {
    const reversedObj = {};
    for (const key in User.userRoles) {
      reversedObj[User.userRoles[key]] = key;
    }
    return reversedObj;
  }

  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    get(this) {
      return User.getUserRole(this.getDataValue('role'));
    },
    set (this, value) {
      return this.setDataValue('role', User.setUserRole(value as string));
    },
    allowNull: false,
  })
  role: number;

  @HasMany(() => Product, 'owner_id')
  products: Product[];

  @HasOne(() => ShoppingCart, 'user_id')
  shopping_cart: ShoppingCart;

}
