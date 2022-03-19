import { IsPositive, Min } from "class-validator"
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql"

import { Director } from "../entity/Director"
import { Movie } from "../entity/Movie"

@InputType()
class CreateMovieInput {
  @Field()
  title!: string
  
  @Min(1872)
  @Field(() => Int)
  releaseYear!: number
  
  @IsPositive()
  @Field(() => Int)
  runTime!: number

  @IsPositive()
  @Field(() => Int, { nullable: true })
  budget?: number

  @IsPositive()
  @Field(() => Int, { nullable: true })
  boxOffice?: number

  @Field({ nullable: true })
  directorId?: string
}

@InputType()
class UpdateMovieInput {
  @Field({ nullable: true })
  title?: string
  
  @Min(1872)
  @Field(() => Int, { nullable: true })
  releaseYear?: number
  
  @IsPositive()
  @Field(() => Int, { nullable: true })
  runTime?: number

  @IsPositive()
  @Field(() => Int, { nullable: true })
  budget?: number

  @IsPositive()
  @Field(() => Int, { nullable: true })
  boxOffice?: number
  
  @Field({ nullable: true })
  directorId?: string
}

@Resolver(() => Movie)
export class MovieResolver {
  @Query(() => Movie, { nullable: true })
  movie(
    @Arg("id") id: string
  ): Promise<Movie | undefined> {
    return Movie.findOne({ id })
  }

  @Query(() => [Movie])
  movies(): Promise<Movie[]> {
    return Movie.find()
  }

  @Mutation(() => Movie)
  async createMovie(
    @Arg("movieOptions", () => CreateMovieInput) movieOptions: CreateMovieInput
  ): Promise<Movie> {
    if (movieOptions.directorId && !await Director.findOne({ id: movieOptions.directorId })) {
      throw new Error(`Unable to find director with id: ${movieOptions.directorId}`)
    }

    return Movie.create(movieOptions).save()
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Arg("id") id: string,
    @Arg("movieOptions", () => UpdateMovieInput) movieOptions: UpdateMovieInput
  ): Promise<Movie> {
    const movie = await Movie.findOne({ id })
    if (!movie) {
      throw new Error(`Unable to find movie with id: ${id}`)
    }

    if (movieOptions.directorId && !await Director.findOne({ id: movieOptions.directorId })) {
      throw new Error(`Unable to find director with id: ${movieOptions.directorId}`)
    }

    Object.assign(movie, movieOptions)
    return movie.save()
  }

  @Mutation(() => String)
  async deleteMovie(
    @Arg("id") id: string
  ): Promise<string> {
    const movie = await Movie.findOne({ id })
    if (!movie) {
      throw new Error(`Unable to find movie with id: ${id}`)
    }

    await movie.remove()
    return id
  }
}
