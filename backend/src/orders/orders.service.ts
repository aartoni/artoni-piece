import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { PropertyService } from 'src/properties/property.service';

export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private propertyService: PropertyService,
  ) {}

  async create(propertyId: string, pieces: number) {
    const property = await this.propertyService.buyPieces(propertyId, pieces);
    return this.ordersRepository.create({
      boughtPieces: pieces,
      property,
    });
  }
}
