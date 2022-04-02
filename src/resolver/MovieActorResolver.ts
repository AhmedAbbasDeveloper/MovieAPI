import { Arg, Mutation, Resolver } from "type-graphql"

import { Actor } from "../entity/Actor"
import { Movie } from "../entity/Movie"
import { MovieActor } from "../entity/MovieActor"

@Resolver(() => MovieActor)
export class MovieActorResolver {
  @Mutation(() => MovieActor)
  async createMovieActor(
    @Arg("movieId") movieId: string,
    @Arg("actorId") actorId: string
  ): Promise<MovieActor> {
    const movie = await Movie.findOne({ id: movieId })
    if (!movie) {
      throw new Error(`Unable to find movie with id: ${movieId}`)
    }

    const actor = await Actor.findOne({ id: actorId })
    if (!actor) {
      throw new Error(`Unable to find actor with id: ${actorId}`)
    }

    return MovieActor.create({ movieId, actorId }).save()
  }

  @Mutation(() => String)
  async deleteMovieActor(
    @Arg("id") id: string
  ): Promise<string> {
    const movieActor = await MovieActor.findOne({ id })
    if (!movieActor) {
      throw new Error(`Unable to find movieActor with id: ${id}`)
    }
    
    await movieActor.remove()
    return id
  }
}
