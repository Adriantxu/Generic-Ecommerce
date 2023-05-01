import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { Product } from './models/product.model';
import { Categories } from './models/categories.model';
import { ProductCategories } from './models/product_categories.model';
import { ShoppingCart } from './models/shopping_cart.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (): Promise<Sequelize> => {
      const sequelize = new Sequelize(
        process.env.POSTGRES_DB,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        { host: 'localhost', dialect: 'postgres', port: +process.env.DB_PORT },
      );
      sequelize.addModels([
        User,
        Product,
        Categories,
        ProductCategories,
        ShoppingCart,
      ])
      try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (e) {
        console.error(e);
      }
      return sequelize;
    },
  },
];
