import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1733321723614 implements MigrationInterface {
    name = 'MyMigration1733321723614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_27dfb27fa51d974e61a6bc54ff2"`);
        await queryRunner.query(`ALTER TABLE "userole" DROP COLUMN "roleID"`);

        const columnExists = await queryRunner.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'user' AND column_name = 'firstname'
        `);
      
        if (columnExists.length === 0) {
            await queryRunner.query('ALTER TABLE "user" ADD "firstname" character varying NOT NULL DEFAULT \'Unknown\'');
        }
        
        // Check if the 'lastname' column exists before altering it
        const lastnameColumnExists = await queryRunner.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'user' AND column_name = 'lastname'
        `);

        if (lastnameColumnExists.length === 0) {
            await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying`);
        }

        // Update existing rows to set a default value for 'lastname'
        await queryRunner.query(`UPDATE "user" SET "lastname" = 'Unknown' WHERE "lastname" IS NULL`);

        // Now alter the column to set NOT NULL constraint
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastname" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userUserid"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "isSoftDel" boolean NOT NULL DEFAULT false`);
        
        // Modify constraints
        await queryRunner.query(`ALTER TABLE "userole" DROP CONSTRAINT "FK_0700f0af33e768db47c64fd0545"`);
        await queryRunner.query(`ALTER TABLE "userole" ALTER COLUMN "roleid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userole" ADD CONSTRAINT "FK_0700f0af33e768db47c64fd0545" FOREIGN KEY ("roleid") REFERENCES "roles"("roleid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userole" DROP CONSTRAINT "FK_0700f0af33e768db47c64fd0545"`);
        await queryRunner.query(`ALTER TABLE "userole" ALTER COLUMN "roleid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userole" ADD CONSTRAINT "FK_0700f0af33e768db47c64fd0545" FOREIGN KEY ("roleid") REFERENCES "roles"("roleid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "isSoftDel"`);
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "firstname"');
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userUserid" integer`);
        await queryRunner.query(`ALTER TABLE "userole" ADD "roleID" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_27dfb27fa51d974e61a6bc54ff2" FOREIGN KEY ("userUserid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
