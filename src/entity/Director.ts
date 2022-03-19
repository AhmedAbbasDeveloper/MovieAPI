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
  @Column({ type: "text", unique: true  })
  name!: string

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => [Movie])
  @OneToMany(() => Movie, movie => movie.director)
  movies!: Promise<Movie[]>
}
