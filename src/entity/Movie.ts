import { Field, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { Director } from "./Director"
import { Review } from "./Review"

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column("text")
  title!: string

  @Field(() => Int)
  @Column("int")
  releaseYear!: number

  @Field(() => Int)
  @Column("int")
  runTime!: number

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  budget?: number

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  boxOffice?: number
  
  @Field({ nullable: true })
  @Column("uuid", { nullable: true })
  directorId?: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => Director, { nullable: true })
  @ManyToOne(() => Director, director => director.movies, { nullable: true, onUpdate: "CASCADE", onDelete: "SET NULL" })
  director?: Promise<Director>

  @Field(() => [Review])
  @OneToMany(() => Review, review => review.movie)
  reviews!: Promise<Review[]>
}
