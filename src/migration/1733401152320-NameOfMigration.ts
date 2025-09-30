import { MigrationInterface, QueryRunner } from "typeorm";

export class NameOfMigration1733401152320 implements MigrationInterface {
    name = 'NameOfMigration1733401152320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstname" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstname" SET DEFAULT 'Unknown'`);
    }

}
