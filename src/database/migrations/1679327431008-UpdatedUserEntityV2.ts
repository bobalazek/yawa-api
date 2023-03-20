import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUserEntityV21679327431008 implements MigrationInterface {
    name = 'UpdatedUserEntityV21679327431008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bffe933a388d6bde48891ff95a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetLastRequestedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetLastRequestExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailConfirmationCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "newEmailConfirmationCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastPasswordResetRequestedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "emailConfirmationCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "newEmailConfirmationCode" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetCode" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastPasswordResetRequestedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetLastRequestedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetLastRequestExpiresAt" TIMESTAMP`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bffe933a388d6bde48891ff95a" ON "users" ("passwordResetToken") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bffe933a388d6bde48891ff95a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetLastRequestExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetLastRequestedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastPasswordResetRequestedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "newEmailConfirmationCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailConfirmationCode"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastPasswordResetRequestedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetCode" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "newEmailConfirmationCode" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "emailConfirmationCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetLastRequestExpiresAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetLastRequestedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetToken" character varying`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bffe933a388d6bde48891ff95a" ON "users" ("passwordResetToken") `);
    }

}
