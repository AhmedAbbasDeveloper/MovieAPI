import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMoviesDirectorsAndReviews1648262835204 implements MigrationInterface {
    name = 'AddMoviesDirectorsAndReviews1648262835204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "director" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" text NOT NULL UNIQUE ,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
            );
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "title" text NOT NULL,
                "release_year" integer NOT NULL,
                "run_time" integer NOT NULL,
                "budget" integer,
                "box_office" integer,
                "director_id" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                UNIQUE ("title", "release_year"),
                FOREIGN KEY ("director_id") REFERENCES "director"("id") ON DELETE SET NULL ON UPDATE NO ACTION
            );
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "review" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "movie_id" uuid NOT NULL,
                "stars" integer NOT NULL,
                "comment" text,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "review" CASCADE;`)
        await queryRunner.query(`DROP TABLE IF EXISTS "movie" CASCADE;`)
        await queryRunner.query(`DROP TABLE IF EXISTS "director" CASCADE;`)
    }
}
