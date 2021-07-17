import { Suspense } from "react"
import { Link as BlitzLink, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Box, Button, Stack } from "@chakra-ui/react"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  if (currentUser) {
    return (
      <>
        <Box textAlign="center" p={4}>
          <Stack>
            <BlitzLink href="/products" passHref>
              <Button as="a" fontSize="lg" variant="solid" colorScheme="purple">
                Products
              </Button>
            </BlitzLink>
            <Button as="a" fontSize="lg" variant="solid" colorScheme="purple" disabled={true}>
              Planner
            </Button>
            <Button as="a" fontSize="lg" variant="solid" colorScheme="purple" disabled={true}>
              Recipes
            </Button>
          </Stack>
          <Box>
            User id: <code>{currentUser.id}</code>
            <br />
            User role: <code>{currentUser.role}</code>
          </Box>
          <Button
            colorScheme="purple"
            className="button small"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Sign out
          </Button>
        </Box>
      </>
    )
  } else {
    return (
      <>
        <BlitzLink href="/signup" passHref>
          <Button as="a" colorScheme="purple" className="button small">
            Sign up
          </Button>
        </BlitzLink>
        <BlitzLink href="/login" passHref>
          <Button as="a" colorScheme="purple" className="button small">
            Sign in
          </Button>
        </BlitzLink>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
