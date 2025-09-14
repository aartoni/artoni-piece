import { PropertyStatus } from 'src/properties/property.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProperties1757756867064 implements MigrationInterface {
  name = 'SeedProperties1757756867064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('property')
      .values([
        {
          city: 'New York',
          address: '123 Broadway Ave',
          totalPieces: 10,
          soldPieces: 2,
          unitPrice: 500000.0,
          status: PropertyStatus.AVAILABLE,
          image: 'http://localhost:5173/property-1.jpg',
        },
        {
          city: 'Los Angeles',
          address: '456 Sunset Blvd',
          totalPieces: 8,
          soldPieces: 1,
          unitPrice: 350000.0,
          status: PropertyStatus.AVAILABLE,
          image: 'http://localhost:5173/property-2.jpg',
        },
        {
          city: 'Chicago',
          address: '789 Lakeshore Dr',
          totalPieces: 15,
          soldPieces: 10,
          unitPrice: 275000.0,
          status: PropertyStatus.NOT_AVAILABLE,
          image: 'http://localhost:5173/property-3.jpg',
        },
        {
          city: 'Miami',
          address: '101 Ocean Dr',
          totalPieces: 20,
          soldPieces: 5,
          unitPrice: 600000.0,
          status: PropertyStatus.AVAILABLE,
          image: 'http://localhost:5173/property-4.jpg',
        },
        {
          city: 'San Francisco',
          address: '202 Market St',
          totalPieces: 12,
          soldPieces: 0,
          unitPrice: 750000.0,
          status: PropertyStatus.HIDDEN,
        },
      ])
      .orIgnore()
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('property')
      .where('address IN (:...addresses)', {
        addresses: [
          '123 Broadway Ave',
          '456 Sunset Blvd',
          '789 Lakeshore Dr',
          '101 Ocean Dr',
          '202 Market St',
        ],
      })
      .execute();
  }
}
