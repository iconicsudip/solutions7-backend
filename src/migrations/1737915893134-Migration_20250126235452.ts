import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501262354521737915893134 implements MigrationInterface {
    name = 'Migration202501262354521737915893134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "shortDescription" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "cardLinkText" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "cardLink" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "cardLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "cardLinkText" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "icon" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "shortDescription" SET NOT NULL`);
    }

}
