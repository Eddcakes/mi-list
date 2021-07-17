import { Ctx } from "blitz" //resolver,
import db from "db"
import { gql } from "graphql-request"
import * as z from "zod"

import { UpdateProduct } from "app/products/validations"
export type UpdateProductType = z.infer<typeof UpdateProduct>
/* export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const product = await db.product.update({ where: { id }, data })

    return product
  }
)
 */

export default async function updateProduct(input: UpdateProductType, { session }: Ctx) {
  if (!session.userId) return null
  const { product } = await db.request(
    gql`
      mutation updateAProduct(
        $id: ID!
        $name: String!
        $isImportant: Boolean
        $isComplete: Boolean
        $isDeleted: Boolean
      ) {
        product: updateProduct(
          id: $id
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
    {
      id: input.id,
      name: input.name,
      isImportant: input.isImportant,
      isComplete: input.isComplete,
      isDeleted: input.isDeleted,
    }
  )
  return product
}
