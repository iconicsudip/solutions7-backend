import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501240052111737660131457 implements MigrationInterface {
    name = 'Migration202501240052111737660131457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pages" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "isPublished" boolean NOT NULL, "isDeleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "headers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pageId" integer NOT NULL, CONSTRAINT "PK_33a1a4f4fc672e41bdad5e217aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "headers" ADD CONSTRAINT "FK_c91295c1bddef5a3c0c4ae4d508" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "headers" DROP CONSTRAINT "FK_c91295c1bddef5a3c0c4ae4d508"`);
        await queryRunner.query(`DROP TABLE "headers"`);
        await queryRunner.query(`DROP TABLE "pages"`);
    }

}
