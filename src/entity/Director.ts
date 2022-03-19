import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { Movie } from "./Movie"

@ObjectType()
@Entity()
export class Director extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column("text")
  name!: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => [Movie])
  @OneToMany(() => Movie, movie => movie.director)
  movies!: Promise<Movie[]>
}
