import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501260020221737831022623 implements MigrationInterface {
    name = 'Migration202501260020221737831022623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pagecontentsection" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "contentType" character varying NOT NULL, "section" character varying NOT NULL, "order" integer NOT NULL, "pageId" integer NOT NULL, CONSTRAINT "PK_892046b176494e2951dcb5e8843" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pagecontentsection" ADD CONSTRAINT "FK_7515575bd06e25b2e862c1fb321" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagecontentsection" DROP CONSTRAINT "FK_7515575bd06e25b2e862c1fb321"`);
        await queryRunner.query(`DROP TABLE "pagecontentsection"`);
    }

}
