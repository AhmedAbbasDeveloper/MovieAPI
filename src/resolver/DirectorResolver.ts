import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Director } from "../entity/Director"

@Resolver(() => Director)
export class DirectorResolver {
  @Query(() => Director, { nullable: true })
  director(
    @Arg("id") id: string
  ): Promise<Director | undefined> {
    return Director.findOne({ id })
  }

  @Query(() => [Director])
  directors(): Promise<Director[]> {
    return Director.find()
  }

  @Mutation(() => Director)
  createDirector(
    @Arg("name") name: string
  ): Promise<Director> {
    return Director.create({ name }).save()
  }

  @Mutation(() => Director)
  async updateDirector(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<Director> {
    const director = await Director.findOne({ id })
    if (!director) {
      throw new Error(`Unable to find director with id: ${id}`)
    }

    Object.assign(director, { name })
    return director.save()
  }

  @Mutation(() => String)
  async deleteDirector(
    @Arg("id") id: string
  ): Promise<string> {
    const director = await Director.findOne({ id })
    if (!director) {
      throw new Error(`Unable to find director with id: ${id}`)
    }
    
    await director.remove()
    return id
  }
}
