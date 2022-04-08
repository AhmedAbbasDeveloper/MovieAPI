import {MigrationInterface, QueryRunner} from "typeorm";

export class AddActors1648955073614 implements MigrationInterface {
    name = 'AddActors1648955073614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "actor" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" text NOT NULL UNIQUE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
            )
        `)
        
        await queryRunner.query(`
            CREATE TABLE "movie_actor" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "movie_id" uuid NOT NULL,
                "actor_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                UNIQUE ("movie_id", "actor_id"),
                FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `)
        
        await queryRunner.query(`CREATE INDEX "idx_movie_actor_movie_id" ON "movie_actor" ("movie_id")`)
        await queryRunner.query(`CREATE INDEX "idx_movie_actor_actor_id" ON "movie_actor" ("actor_id")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_movie_actor_actor_id"`)
        await queryRunner.query(`DROP INDEX "public"."idx_movie_actor_movie_id"`)
        await queryRunner.query(`DROP TABLE "movie_actor" CASCADE`)
        await queryRunner.query(`DROP TABLE "actor" CASCADE`)
    }
}
