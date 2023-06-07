import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1686159992292 implements MigrationInterface {
    name = 'Initial1686159992292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_access_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "refreshToken" character varying NOT NULL, "expiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_f07c49baf74e5d699c83e2ec2bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a50eaa4ac05e4931ef6c541bb4" ON "user_access_tokens" ("token") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bcf836525486eb88479d97c310" ON "user_access_tokens" ("refreshToken") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "newEmail" character varying, "beforeDeletionEmail" character varying, "password" character varying NOT NULL, "languageCode" character varying NOT NULL DEFAULT 'en', "measurementSystem" character varying NOT NULL DEFAULT 'metric', "timezone" character varying NOT NULL DEFAULT 'UTC', "firstName" character varying NOT NULL, "birthday" date, "roles" jsonb NOT NULL, "emailConfirmationToken" character varying, "newEmailConfirmationToken" character varying, "passwordResetToken" character varying, "emailConfirmedAt" TIMESTAMP, "passwordResetLastRequestedAt" TIMESTAMP, "newEmailConfirmationLastSentAt" TIMESTAMP, "deletionRequestedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1335c20d0fdfb23c3e9faa3ec" ON "users" ("newEmail") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c24a12799235111ae3f8fedf83" ON "users" ("emailConfirmationToken") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cc8b7488850e18a4f69f2fbf5d" ON "users" ("newEmailConfirmationToken") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bffe933a388d6bde48891ff95a" ON "users" ("passwordResetToken") `);
        await queryRunner.query(`CREATE TABLE "goals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying, "name" character varying NOT NULL, "description" character varying, "areas" character varying array NOT NULL, "enteredAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e83d6e56e6a2a332823bdd294e" ON "goals" ("key") `);
        await queryRunner.query(`CREATE TABLE "action_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "actionId" uuid NOT NULL, "amount" integer NOT NULL, "enteredAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ce3a6aeeab16dc867581491a250" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."actions_goaltype_enum" AS ENUM('binary', 'measurable')`);
        await queryRunner.query(`CREATE TYPE "public"."actions_goalintervalunit_enum" AS ENUM('day', 'week', 'month', 'year')`);
        await queryRunner.query(`CREATE TYPE "public"."actions_reminderintervaltype_enum" AS ENUM('only_once', 'recurring_every_x_y', 'recurring_x_times_per_y')`);
        await queryRunner.query(`CREATE TYPE "public"."actions_reminderrecurrenceintervalunit_enum" AS ENUM('minute', 'hour', 'day', 'week', 'month', 'year')`);
        await queryRunner.query(`CREATE TYPE "public"."actions_reminderrecurrencevarianceunit_enum" AS ENUM('minute', 'hour', 'day', 'week', 'month', 'year')`);
        await queryRunner.query(`CREATE TABLE "actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "template" character varying, "userId" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "iconUrl" character varying, "goalType" "public"."actions_goaltype_enum" NOT NULL, "goalAmount" integer, "goalUnit" character varying, "goalIntervalUnit" "public"."actions_goalintervalunit_enum" NOT NULL, "reminderEnabled" boolean NOT NULL, "reminderIntervalType" "public"."actions_reminderintervaltype_enum", "reminderStartDate" date, "reminderEndDate" date, "reminderStartTime" character varying DEFAULT '00:00', "reminderEndTime" character varying, "reminderRecurrenceIntervalAmount" integer, "reminderRecurrenceIntervalUnit" "public"."actions_reminderrecurrenceintervalunit_enum", "reminderRecurrenceVarianceAmount" integer, "reminderRecurrenceVarianceUnit" "public"."actions_reminderrecurrencevarianceunit_enum", "reminderLastExecutedAt" TIMESTAMP, "reminderNextExecutesAt" TIMESTAMP, "reminderMuteEndsAt" TIMESTAMP, "enteredAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actions_goals_goals" ("actionsId" uuid NOT NULL, "goalsId" uuid NOT NULL, CONSTRAINT "PK_0d045928567f2ce3536b96e43a4" PRIMARY KEY ("actionsId", "goalsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_106d637c6d99fd42515852101d" ON "actions_goals_goals" ("actionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8be4d1f1eddc032c2d859fa76e" ON "actions_goals_goals" ("goalsId") `);
        await queryRunner.query(`ALTER TABLE "user_access_tokens" ADD "refreshTokenClaimedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_access_tokens" ADD CONSTRAINT "FK_71a030e491d5c8547fc1e38ef82" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goals" ADD CONSTRAINT "FK_57dd8a3fc26eb760d076bf8840e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "action_entries" ADD CONSTRAINT "FK_f5369980a9cec51940edff01b71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "action_entries" ADD CONSTRAINT "FK_b18594ba7cf6505df6089693207" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actions" ADD CONSTRAINT "FK_83a262823d7b54757fa07171b90" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actions_goals_goals" ADD CONSTRAINT "FK_106d637c6d99fd42515852101d0" FOREIGN KEY ("actionsId") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "actions_goals_goals" ADD CONSTRAINT "FK_8be4d1f1eddc032c2d859fa76eb" FOREIGN KEY ("goalsId") REFERENCES "goals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions_goals_goals" DROP CONSTRAINT "FK_8be4d1f1eddc032c2d859fa76eb"`);
        await queryRunner.query(`ALTER TABLE "actions_goals_goals" DROP CONSTRAINT "FK_106d637c6d99fd42515852101d0"`);
        await queryRunner.query(`ALTER TABLE "actions" DROP CONSTRAINT "FK_83a262823d7b54757fa07171b90"`);
        await queryRunner.query(`ALTER TABLE "action_entries" DROP CONSTRAINT "FK_b18594ba7cf6505df6089693207"`);
        await queryRunner.query(`ALTER TABLE "action_entries" DROP CONSTRAINT "FK_f5369980a9cec51940edff01b71"`);
        await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_57dd8a3fc26eb760d076bf8840e"`);
        await queryRunner.query(`ALTER TABLE "user_access_tokens" DROP CONSTRAINT "FK_71a030e491d5c8547fc1e38ef82"`);
        await queryRunner.query(`ALTER TABLE "user_access_tokens" DROP COLUMN "refreshTokenClaimedAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8be4d1f1eddc032c2d859fa76e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_106d637c6d99fd42515852101d"`);
        await queryRunner.query(`DROP TABLE "actions_goals_goals"`);
        await queryRunner.query(`DROP TABLE "actions"`);
        await queryRunner.query(`DROP TYPE "public"."actions_reminderrecurrencevarianceunit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."actions_reminderrecurrenceintervalunit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."actions_reminderintervaltype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."actions_goalintervalunit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."actions_goaltype_enum"`);
        await queryRunner.query(`DROP TABLE "action_entries"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e83d6e56e6a2a332823bdd294e"`);
        await queryRunner.query(`DROP TABLE "goals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bffe933a388d6bde48891ff95a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc8b7488850e18a4f69f2fbf5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c24a12799235111ae3f8fedf83"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1335c20d0fdfb23c3e9faa3ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcf836525486eb88479d97c310"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a50eaa4ac05e4931ef6c541bb4"`);
        await queryRunner.query(`DROP TABLE "user_access_tokens"`);
    }

}
