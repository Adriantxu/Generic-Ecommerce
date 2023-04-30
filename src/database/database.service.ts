import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { databaseProviders } from './database.provider';

@Injectable()
export class DatabaseService {
  private sequelize: Sequelize;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.sequelize = await databaseProviders[0].useFactory();
  }

  private async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (e) {
      console.error(e);
    }
  }

  getSequelize() {
    return this.sequelize;
  }
}
