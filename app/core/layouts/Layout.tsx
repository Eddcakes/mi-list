import { ReactNode } from "react"
import { Head } from "blitz"
import { Box, Container, useColorMode } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../components/ColorModeSwitcher"
import { GoHome } from "../components/GoHome"

type LayoutProps = {
  title?: string
  children: ReactNode
}

/*
  to avoid initial flash in dark mode: https://blitzjs.com/docs/pages
*/

const Layout = ({ title, children }: LayoutProps) => {
  const { colorMode } = useColorMode()
  // prob get from theme?
  const headerColor = { light: "blue.100", dark: "blue.900" }
  const bgColor = { light: "gray.50", dark: "blue.700" }
  return (
    <>
      <Head>
        <title>{title || "my-list"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg={bgColor[colorMode]} height="100vh">
        <Box
          as="header"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingX="4"
          paddingY="2"
          bg={headerColor[colorMode]}
        >
          <GoHome />
          <ColorModeSwitcher />
        </Box>
        <Container>{children}</Container>
      </Box>
    </>
  )
}

export default Layout
