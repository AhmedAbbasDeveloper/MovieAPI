import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Actor } from "../entity/Actor"

@Resolver(() => Actor)
export class ActorResolver {
  @Query(() => Actor, { nullable: true })
  actor(
    @Arg("id") id: string
  ): Promise<Actor | undefined> {
    return Actor.findOne({ id })
  }

  @Query(() => [Actor])
  actors(): Promise<Actor[]> {
    return Actor.find()
  }

  @Mutation(() => Actor)
  createActor(
    @Arg("name") name: string
  ): Promise<Actor> {
    return Actor.create({ name }).save()
  }

  @Mutation(() => Actor)
  async updateActor(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<Actor> {
    const actor = await Actor.findOne({ id })
    if (!actor) {
      throw new Error(`Unable to find actor with id: ${id}`)
    }

    Object.assign(actor, { name })
    return actor.save()
  }

  @Mutation(() => String)
  async deleteActor(
    @Arg("id") id: string
  ): Promise<string> {
    const actor = await Actor.findOne({ id })
    if (!actor) {
      throw new Error(`Unable to find actor with id: ${id}`)
    }
    
    await actor.remove()
    return id
  }
}
