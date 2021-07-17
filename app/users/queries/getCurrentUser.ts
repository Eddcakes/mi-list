import { Ctx } from "blitz"
import db from "db"
import { gql } from "graphql-request"

/* export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
} */

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  console.log("get current user")
  if (!session.userId) return null

  const { user } = await db.request(
    gql`
      query getUser($id: ID!) {
        user: findUserByID(id: $id) {
          id: _id
          email
          name
          role
        }
      }
    `,
    { id: session.userId }
  )

  return user
}
