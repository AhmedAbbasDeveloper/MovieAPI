import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql"

import { Movie } from "../entity/Movie"
import { Review } from "../entity/Review"

@InputType()
class CreateReviewInput {
  @Field()
  movieId!: string

  @Field(() => Int)
  stars!: number

  @Field({ nullable: true })
  comment?: string
}

@InputType()
class UpdateReviewInput {
  @Field({ nullable: true })
  movieId?: string

  @Field(() => Int, { nullable: true })
  stars?: number

  @Field({ nullable: true })
  comment?: string
}

@Resolver(() => Review)
export class ReviewResolver {
  @Query(() => Review, { nullable: true })
  review(
    @Arg("id") id: string
  ): Promise<Review | undefined> {
    return Review.findOne({ id })
  }

  @Query(() => [Review])
  reviews(): Promise<Review[]> {
    return Review.find()
  }

  @Mutation(() => Review)
  async createReview(
    @Arg("reviewOptions", () => CreateReviewInput) reviewOptions: CreateReviewInput
  ): Promise<Review> {
    if (!await Movie.findOne({ id: reviewOptions.movieId })) {
      throw new Error(`Unable to find movie with id: ${reviewOptions.movieId}`)
    }

    return Review.create(reviewOptions).save()    
  }

  @Mutation(() => Review)
  async updateReview(
    @Arg("id") id: string,
    @Arg("reviewOptions", () => UpdateReviewInput) reviewOptions: UpdateReviewInput
  ): Promise<Review> {
    const review = await Review.findOne({ id })
    if (!review) {
      throw new Error(`Unable to find review with id: ${id}`)
    }

    if (reviewOptions.movieId && !await Movie.findOne({ id: reviewOptions.movieId })) {
      throw new Error(`Unable to find movie with id: ${reviewOptions.movieId}`)
    }
    
    Object.assign(review, reviewOptions)
    return review.save()
  }

  @Mutation(() => String)
  async deleteReview(
    @Arg("id") id: string
  ): Promise<string> {
    const review = await Review.findOne({ id })

    if (!review) {
      throw new Error(`Unable to find review with id: ${id}`)
    }

    await review.remove()
    return id
  }
}
