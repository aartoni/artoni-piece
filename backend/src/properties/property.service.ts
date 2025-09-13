import { InjectRepository } from '@nestjs/typeorm';
import { Property, PropertyStatus } from './property.entity';
import { Not, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

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

  buyPieces(id: string, qty: number) {
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new BadRequestException('qty must be a positive integer');
    }

    return this.propertyRepository.manager.transaction(async (manager) => {
      const repo = manager.getRepository(Property);

      // Lock the row so concurrent buys don't oversell
      const property = await repo
        .createQueryBuilder('p')
        .setLock('pessimistic_write')
        .where('p.id = :id', { id })
        .getOne();

      if (!property) {
        throw new NotFoundException('Property not found');
      }

      if (property.status === PropertyStatus.HIDDEN) {
        throw new BadRequestException('Property is not for sale');
      }

      if (qty > property.availablePieces) {
        throw new ConflictException('Not enough pieces available');
      }

      property.soldPieces += qty;

      if (property.availablePieces === 0) {
        property.status = PropertyStatus.NOT_AVAILABLE;
      }

      return repo.save(property);
    });
  }
}
