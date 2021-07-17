import { Ctx } from "blitz" //resolver,
import db from "db"
import { gql } from "graphql-request"
import * as z from "zod"

import { DeleteProduct } from "app/products/validations"

type DeleteProductType = z.infer<typeof DeleteProduct>
/* export default resolver.pipe(resolver.zod(DeleteProduct), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.deleteMany({ where: { id } })

  return product
})
 */

export default async function deleteProduct(input: DeleteProductType, { session }: Ctx) {
  if (!session.userId) return null

  const { product } = await db.request(
    gql`
      mutation deleteAProduct($id: ID!) {
        deleteProduct(id: $id) {
          id: _id
          name
        }
      }
    `,
    { id: input.id }
  )
  return product
}
