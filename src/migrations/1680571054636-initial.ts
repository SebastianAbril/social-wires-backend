import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1680571054636 implements MigrationInterface {
    name = 'initial1680571054636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, "fullname" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "reaction" character varying NOT NULL, "message_id" integer, "author_id" integer, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "message_id" integer, "author_id" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "text" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_771eec19d360b0dd9ae9236f743" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_a982661c7375f3b20e0eb9ed19e" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_54ce30caeb3f33d68398ea10376" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_54ce30caeb3f33d68398ea10376"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_a982661c7375f3b20e0eb9ed19e"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_771eec19d360b0dd9ae9236f743"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
