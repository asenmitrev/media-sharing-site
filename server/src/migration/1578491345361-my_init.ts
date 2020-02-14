import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1578491345361 implements MigrationInterface {
    name = 'myInit1578491345361'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(1000) NOT NULL, "postType" character varying(10) NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "post"`, undefined);
    }

}
