import React from "react"
import { Button } from "@chakra-ui/react"
import { useRouter, Routes, Link as BlitzLink } from "blitz"

export const GoHome = (props) => {
  const router = useRouter()
  return (
    <BlitzLink href={Routes.Home()} passHref>
      <Button
        as="a"
        size="md"
        fontSize="lg"
        variant="link"
        color="current"
        marginLeft="2"
        aria-label="Go home"
        {...props}
      >
        <span role="img" aria-label="Go home">
          🏠
        </span>
      </Button>
    </BlitzLink>
  )
}
