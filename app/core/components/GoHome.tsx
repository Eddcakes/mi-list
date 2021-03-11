import React from "react"
import { Button } from "@chakra-ui/react"

export const GoHome = (props) => {
  return (
    <Button
      as="a"
      size="md"
      fontSize="lg"
      variant="link"
      color="current"
      marginLeft="2"
      aria-label="Go home"
      href="/"
      {...props}
    >
      <span role="img" aria-label="Go home">
        🏠
      </span>
    </Button>
  )
}
