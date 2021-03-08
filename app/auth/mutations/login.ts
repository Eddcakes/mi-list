import { Ctx } from "blitz"
import { authenticateUser } from "app/auth/auth-utils"

import { Login, LoginType } from "../validations"
import { Role } from "types"

/* export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
}) */

export default async function login(input: LoginType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, password } = Login.parse(input)

  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  await session.$create({ userId: user.id, role: user.role as Role })

  return user
}
