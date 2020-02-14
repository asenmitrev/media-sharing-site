import {MigrationInterface, QueryRunner} from "typeorm";

export class quicklyBuildEntities1578500295446 implements MigrationInterface {
    name = 'quicklyBuildEntities1578500295446'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ip" DROP CONSTRAINT "FK_26ddc4d12a00425e5b6c8a4e11b"`, undefined);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "path" character varying(100) NOT NULL, "size" integer NOT NULL, "name" character varying(200) NOT NULL, "uploaderId" uuid, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "path"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "size"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "uploaderId"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e529b53c18487a72385a6a440f0" FOREIGN KEY ("uploaderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e529b53c18487a72385a6a440f0"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "uploaderId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "name" character varying(200) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "size" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "path" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "file"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD CONSTRAINT "FK_26ddc4d12a00425e5b6c8a4e11b" FOREIGN KEY ("uploaderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
