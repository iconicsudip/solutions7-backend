import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501250030271737745227908 implements MigrationInterface {
    name = 'Migration202501250030271737745227908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "isPublished" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "isDeleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "isDeleted" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "isPublished" DROP DEFAULT`);
    }

}
