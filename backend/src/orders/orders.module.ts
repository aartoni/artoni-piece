import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { Order } from './orders.entity';
import { PropertyModule } from 'src/properties/property.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), PropertyModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
