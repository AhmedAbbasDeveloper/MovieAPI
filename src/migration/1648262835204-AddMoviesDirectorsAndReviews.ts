import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMoviesDirectorsAndReviews1648262835204 implements MigrationInterface {
    name = 'AddMoviesDirectorsAndReviews1648262835204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "director" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" text NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "title" text NOT NULL,
                "releaseYear" integer NOT NULL,
                "runTime" integer NOT NULL,
                "budget" integer DEFAULT NULL,
                "boxOffice" integer DEFAULT NULL,
                "directorId" uuid DEFAULT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE SET NULL ON UPDATE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "review" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "movieId" uuid NOT NULL,
                "stars" integer NOT NULL,
                "comment" text DEFAULT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "review" CASCADE;
        `)
        await queryRunner.query(`
            DROP TABLE IF EXISTS "movie" CASCADE;
        `)
        await queryRunner.query(`
            DROP TABLE IF EXISTS "director" CASCADE;
        `)
    }
}
