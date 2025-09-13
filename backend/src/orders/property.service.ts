import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Repository } from 'typeorm';

export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  findAll() {
    return this.propertyRepository.find();
  }

  findOne(id: string) {
    return this.propertyRepository.findOneBy({ id });
  }
}
