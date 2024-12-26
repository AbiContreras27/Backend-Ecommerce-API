import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductModule } from './Products/products.modules';
import { AuthModule } from './Auth/auth.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import typeorm from "./config/config"


@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }), TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }), CategoriesModule, OrdersModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
