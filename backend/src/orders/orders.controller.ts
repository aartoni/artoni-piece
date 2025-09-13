import { Controller, Post } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create() {
    return this.orderService.create();
  }
}
