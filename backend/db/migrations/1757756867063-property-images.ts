import { MigrationInterface, QueryRunner } from 'typeorm';

export class PropertyImages1757756867063 implements MigrationInterface {
  name = 'PropertyImages1757756867063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "property" ADD "image" character varying(40)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "image"`);
  }
}
