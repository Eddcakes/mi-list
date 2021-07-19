import { Ctx } from "blitz" //resolver,
import db from "db"
import { gql } from "graphql-request"
import { z } from "zod"

import { CreateProduct } from "app/products/validations"

type ProductType = z.infer<typeof CreateProduct>
/* export default resolver.pipe(resolver.zod(CreateProduct), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.create({ data: input })

  return product
})
 */

export default async function createProduct(input: ProductType, { session }: Ctx) {
  const {
    name,
    isImportant = false,
    isComplete = false,
    isDeleted = false,
  } = CreateProduct.parse(input)
  const { product } = await db.request(
    gql`
      mutation createAProduct(
        $name: String!
        $isImportant: Boolean
        $isComplete: Boolean
        $isDeleted: Boolean
      ) {
        product: createProduct(
          data: {
            name: $name
            isImportant: $isImportant
            isComplete: $isComplete
            isDeleted: $isDeleted
          }
        ) {
          id: _id
          name
          isImportant
          isComplete
          isDeleted
        }
      }
    `,
    { name: name, isImportant: isImportant, isComplete: isComplete, isDeleted: isDeleted }
  )
  return product
}
