import {MigrationInterface, QueryRunner} from "typeorm";

export class userRegistration31581503273416 implements MigrationInterface {
    name = 'userRegistration31581503273416'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`, undefined);
    }

}
