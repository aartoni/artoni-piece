import { InjectRepository } from '@nestjs/typeorm';
import { Property, PropertyStatus } from './property.entity';
import { Not, Repository } from 'typeorm';

export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  findAll() {
    return this.propertyRepository.find();
  }

  findPublic() {
    return this.propertyRepository.findBy({
      status: Not(PropertyStatus.HIDDEN),
    });
  }

  findOne(id: string) {
    return this.propertyRepository.findOneBy({ id });
  }
}
