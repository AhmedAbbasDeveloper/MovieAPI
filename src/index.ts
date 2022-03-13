import "reflect-metadata"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"

(async () => {
  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/resolver/*.ts`],
    })
  })

  apolloServer.listen(4000, () => {
    console.log("Server started on port 4000")
  })
})()