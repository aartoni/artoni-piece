import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './orders.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto.property, dto.pieces);
  }
}
