import {MigrationInterface, QueryRunner} from "typeorm";

export class addComments1581778491946 implements MigrationInterface {
    name = 'addComments1581778491946'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "categoryId" TO "postId"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "postId" TO "categoryId"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e" FOREIGN KEY ("categoryId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
