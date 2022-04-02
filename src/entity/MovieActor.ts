import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@ObjectType()
@Entity()
@Unique(["movieId", "actorId"])
export class MovieActor extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Field()
  @Column({ name: "movie_id", type: "uuid" })
  movieId!: string

  @Field()
  @Column({ name: "actor_id", type: "uuid" })
  actorId!: string

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date
}
