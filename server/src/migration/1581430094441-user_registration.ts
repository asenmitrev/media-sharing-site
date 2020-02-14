import {MigrationInterface, QueryRunner} from "typeorm";

export class userRegistration1581430094441 implements MigrationInterface {
    name = 'userRegistration1581430094441'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ip" ALTER COLUMN "createdBy" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdBy" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdBy" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdBy" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "createdBy" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "createdBy" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdBy" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdBy" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdBy" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ip" ALTER COLUMN "createdBy" SET NOT NULL`, undefined);
    }

}
