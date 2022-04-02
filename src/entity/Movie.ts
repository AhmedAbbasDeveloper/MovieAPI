import { Field, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"

import { Actor } from "./Actor"
import { Director } from "./Director"
import { Review } from "./Review"

@ObjectType()
@Entity()
@Unique(["title", "releaseYear"])
export class Movie extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column("text")
  title!: string

  @Field(() => Int)
  @Column({ name: "release_year", type: "int" })
  releaseYear!: number

  @Field(() => Int)
  @Column({ name: "run_time", type: "int" })
  runTime!: number

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  budget?: number

  @Field(() => Int, { nullable: true })
  @Column({ name: "box_office", type: "int", nullable:true })
  boxOffice?: number
  
  @Field({ nullable: true })
  @Column({ name: "director_id", type: "uuid", nullable: true })
  directorId?: string

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => [Actor])
  @ManyToMany(() => Actor, actor => actor.movies, { onUpdate: "NO ACTION", onDelete: "CASCADE" })
  @JoinTable({ name: 'movie_actor', joinColumn: { name: "movie_id" }, inverseJoinColumn: { name: "actor_id" } })
  actors!: Promise<Actor[]>

  @Field(() => Director, { nullable: true })
  @ManyToOne(() => Director, director => director.movies, { nullable: true, onUpdate: "NO ACTION", onDelete: "SET NULL" })
  @JoinColumn({ name: "director_id" })
  director?: Promise<Director>

  @Field(() => [Review])
  @OneToMany(() => Review, review => review.movie)
  reviews!: Promise<Review[]>
}
