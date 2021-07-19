import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { gql } from "graphql-request"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password) // .trim() password?
  const { user } = await db.request(
    gql`
      mutation createUser($email: String!, $hashedPassword: String, $role: String!) {
        user: createUser(data: { email: $email, hashedPassword: $hashedPassword, role: $role }) {
          id: _id
          email
          name
          role
        }
      }
    `,
    { email: email.toLowerCase(), hashedPassword, role: "USER" }
  )
  console.log("Create user result:", user)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
