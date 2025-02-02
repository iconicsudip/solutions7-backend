import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501250030431737745243505 implements MigrationInterface {
    name = 'Migration202501250030431737745243505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
