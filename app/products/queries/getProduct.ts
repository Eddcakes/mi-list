//import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"
import { gql } from "graphql-request"

const GetProduct = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})
type ProductType = z.infer<typeof GetProduct>
/*
export default resolver.pipe(resolver.zod(GetProduct), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.findFirst({ where: { id } })

  if (!product) throw new NotFoundError()

  return product
})
 */

export default async function getProduct(productId: ProductType) {
  const { product } = await db.request(
    gql`
      query getProduct($id: ID!) {
        product: findProductByID(id: $id) {
          id: _id
          name
          isImportant
          isComplete
          isDeleted
        }
      }
    `,
    { id: productId.id }
  )
  return product
}
