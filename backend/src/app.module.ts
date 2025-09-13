import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './properties/property.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../db/datasource';
import { OrderModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrderModule,
    PropertyModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
