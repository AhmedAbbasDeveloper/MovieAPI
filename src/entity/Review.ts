import { Field, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { Movie } from "./Movie"

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column({ name: "movie_id", type: "uuid" })
  movieId!: string

  @Field(() => Int)
  @Column("int")
  stars!: number

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  comment?: string

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => Movie)
  @ManyToOne(() => Movie, movie => movie.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie!: Promise<Movie>
}
