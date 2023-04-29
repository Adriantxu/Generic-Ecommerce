import { Sequelize } from 'sequelize-typescript';

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
      sequelize.addModels([]), await sequelize.sync();
      return sequelize;
    },
  },
];
