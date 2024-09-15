import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageTableAdded1726388090007 implements MigrationInterface {
    name = 'ImageTableAdded1726388090007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image_details" ("id" SERIAL NOT NULL, "images" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "eventId" integer, CONSTRAINT "PK_693670923b4a824a82c565b7310" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "image_details" ADD CONSTRAINT "FK_5f43284bf167c3cce9adbeec2c8" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_details" DROP CONSTRAINT "FK_5f43284bf167c3cce9adbeec2c8"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "images" text array`);
        await queryRunner.query(`DROP TABLE "image_details"`);
    }

}
