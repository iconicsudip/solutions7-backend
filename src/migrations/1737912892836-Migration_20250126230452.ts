import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202501262304521737912892836 implements MigrationInterface {
    name = 'Migration202501262304521737912892836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "isDeleted"`);
    }

}
