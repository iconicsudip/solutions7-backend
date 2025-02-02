import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501300041191738177880181 implements MigrationInterface {
    name = 'Migration202501300041191738177880181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "testimonials" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "testimonial" character varying, "designation" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63b03c608bd258f115a0a4a1060" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "testimonials"`);
    }

}
