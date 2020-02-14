import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableLink1581612730773 implements MigrationInterface {
    name = 'nullableLink1581612730773'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "link" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "link" SET NOT NULL`, undefined);
    }

}
