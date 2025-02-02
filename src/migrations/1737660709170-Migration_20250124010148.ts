import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501240101481737660709170 implements MigrationInterface {
    name = 'Migration202501240101481737660709170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "headerId" integer`);
        await queryRunner.query(`CREATE TYPE "public"."headers_headernametype_enum" AS ENUM('PAGE', 'SUB_PAGES')`);
        await queryRunner.query(`ALTER TABLE "headers" ADD "headerNameType" "public"."headers_headernametype_enum" NOT NULL DEFAULT 'PAGE'`);
        await queryRunner.query(`ALTER TABLE "headers" ADD "pageIds" json`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_369cf4a6e00eb98703e7ea290c7" FOREIGN KEY ("headerId") REFERENCES "headers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_369cf4a6e00eb98703e7ea290c7"`);
        await queryRunner.query(`ALTER TABLE "headers" DROP COLUMN "pageIds"`);
        await queryRunner.query(`ALTER TABLE "headers" DROP COLUMN "headerNameType"`);
        await queryRunner.query(`DROP TYPE "public"."headers_headernametype_enum"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "headerId"`);
    }

}
