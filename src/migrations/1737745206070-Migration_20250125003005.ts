import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501250030051737745206070 implements MigrationInterface {
    name = 'Migration202501250030051737745206070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "updatedAt" DROP DEFAULT`);
    }

}
