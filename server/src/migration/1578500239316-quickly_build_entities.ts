import {MigrationInterface, QueryRunner} from "typeorm";

export class quicklyBuildEntities1578500239316 implements MigrationInterface {
    name = 'quicklyBuildEntities1578500239316'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "ip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "ip" character varying(100) NOT NULL, "userId" uuid, CONSTRAINT "PK_b12fba291251bda71560e34b209" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(3000) NOT NULL, "avatar" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "ip"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "ip" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "userId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD "authorId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD "categoryId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "path" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "size" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "name" character varying(200) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "uploaderId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD CONSTRAINT "FK_4a55d49c500fff33a680970a189" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e" FOREIGN KEY ("categoryId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD CONSTRAINT "FK_26ddc4d12a00425e5b6c8a4e11b" FOREIGN KEY ("uploaderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ip" DROP CONSTRAINT "FK_26ddc4d12a00425e5b6c8a4e11b"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e"`, undefined);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP CONSTRAINT "FK_4a55d49c500fff33a680970a189"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "uploaderId"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "size"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "path"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "categoryId"`, undefined);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "authorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" DROP COLUMN "ip"`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "userId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ADD "ip" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "ip"`, undefined);
    }

}
