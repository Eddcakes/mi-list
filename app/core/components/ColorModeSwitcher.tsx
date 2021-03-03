import React from "react"
import { useColorMode, useColorModeValue, Button } from "@chakra-ui/react"

export const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const switchIcon = useColorModeValue("🌙", "🌞")

  return (
    <Button
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      {...props}
    >
      {switchIcon}
    </Button>
  )
}
