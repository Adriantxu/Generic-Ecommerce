import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { User } from './models/user.model';
import { Categories } from './models/categories.model';
import { ProductCategories } from './models/product_categories.model';
import { ShoppingCart } from './models/shopping_cart.model';
import { Product } from './models/product.model';

@Module({
  providers: [...databaseProviders],
  exports: [
    ...databaseProviders,
  ],
})
export class DatabaseModule {}
