import { MigrationInterface, QueryRunner } from "typeorm";

export class IntialMigrations1726297440193 implements MigrationInterface {
    name = 'IntialMigrations1726297440193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "totalGuests" integer, "userId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
