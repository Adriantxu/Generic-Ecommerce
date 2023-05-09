import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    ShoppingCartModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
