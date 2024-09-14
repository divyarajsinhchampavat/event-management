import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageFieldAdded1726300120957 implements MigrationInterface {
    name = 'ImageFieldAdded1726300120957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "images" text array`);
        await queryRunner.query(`ALTER TABLE "event" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_7a773352fcf1271324f2e5a3e41" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_7a773352fcf1271324f2e5a3e41"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
