import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501262301311737912691340 implements MigrationInterface {
    name = 'Migration202501262301311737912691340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "shortDescription" character varying NOT NULL, "description" character varying NOT NULL, "icon" character varying NOT NULL, "cardLinkText" character varying NOT NULL, "cardLink" character varying NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pagecontentsection" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pagecontentsection" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "headers" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "headers" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "headers" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "headers" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "pagecontentsection" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "pagecontentsection" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
