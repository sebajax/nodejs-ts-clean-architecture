import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableMessage1714686029732 implements MigrationInterface {
  name = 'AddTableMessage1714686029732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "message_entity" ("id" SERIAL NOT NULL, "text" text NOT NULL, "sender" text NOT NULL, "room" text NOT NULL, "top_score" jsonb NOT NULL, "details" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE INDEX "idx_message_room" ON "message_entity" ("room") '
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."idx_message_room"');
    await queryRunner.query('DROP TABLE "message_entity"');
  }
}
