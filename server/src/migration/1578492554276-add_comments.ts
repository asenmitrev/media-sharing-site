import {MigrationInterface, QueryRunner} from "typeorm";

export class addComments1578492554276 implements MigrationInterface {
    name = 'addComments1578492554276'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "content" character varying(3000) NOT NULL, "link" character varying(1000) NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD "link" character varying(200) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD "description" character varying(3000) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD "description" character varying(1000) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "link"`, undefined);
        await queryRunner.query(`DROP TABLE "comment"`, undefined);
    }

}
