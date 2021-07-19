import { resolver } from "blitz"
import { authenticateUser } from "app/auth/auth-utils"

import { Login } from "../validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  console.log(`email: ${email}, password: ${password}`)
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
