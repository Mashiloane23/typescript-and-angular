import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLoginAttemptFields1754988477113 implements MigrationInterface {
    name = 'AddLoginAttemptFields1754988477113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groupUser" ("id" SERIAL NOT NULL, "groupGroupId" integer, "userUserid" integer, CONSTRAINT "PK_47ab32652eb5fe6f0c37298a308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("GroupId" SERIAL NOT NULL, "groupname" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a8094cb66c126b4f87cdfc437e8" PRIMARY KEY ("GroupId"))`);
        await queryRunner.query(`CREATE TABLE "GroupTask" ("GroupTaskid" SERIAL NOT NULL, "taskTaskid" integer, "groupGroupId" integer, CONSTRAINT "PK_86a5bb9caaeaf59e75d33f8d20a" PRIMARY KEY ("GroupTaskid"))`);
        await queryRunner.query(`CREATE TABLE "Notification" ("notification_ID" SERIAL NOT NULL, "message" character varying NOT NULL, "userid" integer NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "taskTaskid" integer, CONSTRAINT "PK_9234331b82bfc4d1331ff87c129" PRIMARY KEY ("notification_ID"))`);
        await queryRunner.query(`CREATE TABLE "Task_user" ("id" SERIAL NOT NULL, "taskTaskid" integer, "userUserid" integer, CONSTRAINT "PK_5b6ddc9679be0517aad7b88f4e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "tittle"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "taskid" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "PK_adc93fb9ca4012bfb8785a6bf0e" PRIMARY KEY ("taskid")`);
        await queryRunner.query(`ALTER TABLE "task" ADD "taskname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_d2d0b8a63a238b18491b63a7b2e" UNIQUE ("taskname")`);
        await queryRunner.query(`ALTER TABLE "task" ADD "startdate" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "task" ADD "lastModified" TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."task_taskstatus_enum" AS ENUM('open', 'inprogress', 'done')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "taskstatus" "public"."task_taskstatus_enum" NOT NULL DEFAULT 'open'`);
        await queryRunner.query(`ALTER TABLE "task" ADD "DueDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "Email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_b7eee57d84fb7ed872e660197fb" UNIQUE ("Email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "loginAttempts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "disableuntil" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_74cd41df347e221313c8da47c72" UNIQUE ("description")`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "rolename"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_rolename_enum" AS ENUM('admin', 'project manager', 'developer', 'quality analyst', 'viewer', 'system auditor', 'configuration manager', 'support staff')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "rolename" "public"."roles_rolename_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_2db66a4809c8d953c3cd1975c55" UNIQUE ("rolename")`);
        await queryRunner.query(`ALTER TABLE "groupUser" ADD CONSTRAINT "FK_4fb9279ba81d33fac720105008e" FOREIGN KEY ("groupGroupId") REFERENCES "group"("GroupId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupUser" ADD CONSTRAINT "FK_7aaee55b3bd811e761745dc9bba" FOREIGN KEY ("userUserid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GroupTask" ADD CONSTRAINT "FK_1857e534184d06eb9691f39bea7" FOREIGN KEY ("taskTaskid") REFERENCES "task"("taskid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GroupTask" ADD CONSTRAINT "FK_9a9e66b946a27fa3aaf27a14da7" FOREIGN KEY ("groupGroupId") REFERENCES "group"("GroupId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notification" ADD CONSTRAINT "FK_1be8aca1a2f9aca12a77f076e54" FOREIGN KEY ("taskTaskid") REFERENCES "task"("taskid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task_user" ADD CONSTRAINT "FK_4a06b6e6b2a3e4ae9163cad32d0" FOREIGN KEY ("taskTaskid") REFERENCES "task"("taskid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task_user" ADD CONSTRAINT "FK_58eba87049b4cf442716e5025aa" FOREIGN KEY ("userUserid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task_user" DROP CONSTRAINT "FK_58eba87049b4cf442716e5025aa"`);
        await queryRunner.query(`ALTER TABLE "Task_user" DROP CONSTRAINT "FK_4a06b6e6b2a3e4ae9163cad32d0"`);
        await queryRunner.query(`ALTER TABLE "Notification" DROP CONSTRAINT "FK_1be8aca1a2f9aca12a77f076e54"`);
        await queryRunner.query(`ALTER TABLE "GroupTask" DROP CONSTRAINT "FK_9a9e66b946a27fa3aaf27a14da7"`);
        await queryRunner.query(`ALTER TABLE "GroupTask" DROP CONSTRAINT "FK_1857e534184d06eb9691f39bea7"`);
        await queryRunner.query(`ALTER TABLE "groupUser" DROP CONSTRAINT "FK_7aaee55b3bd811e761745dc9bba"`);
        await queryRunner.query(`ALTER TABLE "groupUser" DROP CONSTRAINT "FK_4fb9279ba81d33fac720105008e"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_2db66a4809c8d953c3cd1975c55"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "rolename"`);
        await queryRunner.query(`DROP TYPE "public"."roles_rolename_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "rolename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_74cd41df347e221313c8da47c72"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "disableuntil"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "loginAttempts"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_b7eee57d84fb7ed872e660197fb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "Email"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "DueDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "taskstatus"`);
        await queryRunner.query(`DROP TYPE "public"."task_taskstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "lastModified"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startdate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_d2d0b8a63a238b18491b63a7b2e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "taskname"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "PK_adc93fb9ca4012bfb8785a6bf0e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "taskid"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "tittle" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "Task_user"`);
        await queryRunner.query(`DROP TABLE "Notification"`);
        await queryRunner.query(`DROP TABLE "GroupTask"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "groupUser"`);
    }

}
