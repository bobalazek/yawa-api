import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1679252858385 implements MigrationInterface {
  name = 'Initial1679252858385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying, "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_577192f12af5677b0f83478994" ON "actions" ("key") `);
    await queryRunner.query(
      `CREATE TABLE "user_access_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "expiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_f07c49baf74e5d699c83e2ec2bd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a50eaa4ac05e4931ef6c541bb4" ON "user_access_tokens" ("token") `);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "newEmail" character varying, "password" character varying NOT NULL, "languageCode" character varying NOT NULL DEFAULT 'en', "measurementSystem" character varying NOT NULL DEFAULT 'metric', "firstName" character varying NOT NULL, "emailConfirmationCode" character varying NOT NULL, "emailConfirmationToken" character varying NOT NULL, "newEmailConfirmationCode" character varying, "newEmailConfirmationToken" character varying, "passwordResetCode" character varying, "emailConfirmedAt" TIMESTAMP, "passwordResetLastRequestedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c24a12799235111ae3f8fedf83" ON "users" ("emailConfirmationToken") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_cc8b7488850e18a4f69f2fbf5d" ON "users" ("newEmailConfirmationToken") `
    );
    await queryRunner.query(
      `CREATE TABLE "goals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying, "name" character varying NOT NULL, "description" character varying, "areas" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e83d6e56e6a2a332823bdd294e" ON "goals" ("key") `);
    await queryRunner.query(
      `CREATE TABLE "actions_goals_goals" ("actionsId" uuid NOT NULL, "goalsId" uuid NOT NULL, CONSTRAINT "PK_0d045928567f2ce3536b96e43a4" PRIMARY KEY ("actionsId", "goalsId"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_106d637c6d99fd42515852101d" ON "actions_goals_goals" ("actionsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_8be4d1f1eddc032c2d859fa76e" ON "actions_goals_goals" ("goalsId") `);
    await queryRunner.query(
      `ALTER TABLE "actions" ADD CONSTRAINT "FK_83a262823d7b54757fa07171b90" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_access_tokens" ADD CONSTRAINT "FK_71a030e491d5c8547fc1e38ef82" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_57dd8a3fc26eb760d076bf8840e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "actions_goals_goals" ADD CONSTRAINT "FK_106d637c6d99fd42515852101d0" FOREIGN KEY ("actionsId") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "actions_goals_goals" ADD CONSTRAINT "FK_8be4d1f1eddc032c2d859fa76eb" FOREIGN KEY ("goalsId") REFERENCES "goals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "actions_goals_goals" DROP CONSTRAINT "FK_8be4d1f1eddc032c2d859fa76eb"`);
    await queryRunner.query(`ALTER TABLE "actions_goals_goals" DROP CONSTRAINT "FK_106d637c6d99fd42515852101d0"`);
    await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_57dd8a3fc26eb760d076bf8840e"`);
    await queryRunner.query(`ALTER TABLE "user_access_tokens" DROP CONSTRAINT "FK_71a030e491d5c8547fc1e38ef82"`);
    await queryRunner.query(`ALTER TABLE "actions" DROP CONSTRAINT "FK_83a262823d7b54757fa07171b90"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8be4d1f1eddc032c2d859fa76e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_106d637c6d99fd42515852101d"`);
    await queryRunner.query(`DROP TABLE "actions_goals_goals"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e83d6e56e6a2a332823bdd294e"`);
    await queryRunner.query(`DROP TABLE "goals"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_cc8b7488850e18a4f69f2fbf5d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c24a12799235111ae3f8fedf83"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a50eaa4ac05e4931ef6c541bb4"`);
    await queryRunner.query(`DROP TABLE "user_access_tokens"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_577192f12af5677b0f83478994"`);
    await queryRunner.query(`DROP TABLE "actions"`);
  }
}
