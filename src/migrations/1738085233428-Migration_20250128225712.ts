import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501282257121738085233428 implements MigrationInterface {
    name = 'Migration202501282257121738085233428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "basicinfo" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7456b6828f0622c6a65ecd07c25" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "basicinfo"`);
    }

}
