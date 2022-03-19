import { Field, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { Movie } from "./Movie"

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column("uuid")
  movieId!: string

  @Field(() => Int)
  @Column("int")
  stars!: number

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  comment?: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => Movie)
  @ManyToOne(() => Movie, movie => movie.reviews, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  movie!: Promise<Movie>
}
