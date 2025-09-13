import { MigrationInterface, QueryRunner } from 'typeorm';

export class PropertyEntity1757756867062 implements MigrationInterface {
  name = 'PropertyEntity1757756867062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."property_status_enum" AS ENUM('available', 'not_available', 'hidden')`,
    );
    await queryRunner.query(
      `CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(40) NOT NULL, "address" character varying(200) NOT NULL, "totalPieces" integer NOT NULL, "soldPieces" integer NOT NULL DEFAULT '0', "unitPrice" numeric(12,2) NOT NULL, "status" "public"."property_status_enum" NOT NULL DEFAULT 'hidden', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4498c7f25b96f86351eac5aeec" ON "property" ("city") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66a03c6018e0d86da3a6ffba98" ON "property" ("status") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66a03c6018e0d86da3a6ffba98"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4498c7f25b96f86351eac5aeec"`,
    );
    await queryRunner.query(`DROP TABLE "property"`);
    await queryRunner.query(`DROP TYPE "public"."property_status_enum"`);
  }
}
