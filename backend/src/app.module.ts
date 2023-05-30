import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './shop/models/food_model';
import { Store } from './shop/models/storie_model';
import { Deliveries } from './shop/models/delivery_model';
import { ShopModule } from './shop/shop.module';
import { User } from './user/user.models';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { Order } from './order/order.models';
import { usersOrder } from './order/user_oder.models';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database:  'Shop-food',
      models: [Food , Store ,Deliveries, User , usersOrder, Order],
     
    }),
    ShopModule,
    OrderModule,
    UserModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
