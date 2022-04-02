import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { Movie } from "./Movie"

@ObjectType()
@Entity()
export class Actor extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column("text")
  name!: string

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date

  @Field(() => [Movie])
  @ManyToMany(() => Movie, movie => movie.actors, { onUpdate: "NO ACTION", onDelete: "CASCADE" })
  movies!: Promise<Movie[]>
}
