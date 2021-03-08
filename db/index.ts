/* import { enhancePrisma } from "blitz"
import { PrismaClient } from "@prisma/client"

const EnhancedPrisma = enhancePrisma(PrismaClient)

export * from "@prisma/client"
export default new EnhancedPrisma()
 */

import { GraphQLClient } from "graphql-request"

const graphQLClient = new GraphQLClient("https://graphql.fauna.com/graphql", {
  headers: {
    authorization: "Bearer " + process.env.FAUNA_SECRET,
  },
})

export default graphQLClient
