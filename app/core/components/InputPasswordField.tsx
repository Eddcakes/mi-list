import {
  FormControl,
  Input,
  Box,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react"
import { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { InputProps } from "./InputField"

export interface InputPasswordProps extends InputProps {}

/* Maybe instead of show/hide button inside of input, have it outside */
export const InputPasswordField = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, name, placeholder, helperText, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
    const [show, setShow] = useState(false)
    const toggleShowPassword = () => setShow(!show)
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <InputGroup size="md">
          <Input
            name={name}
            placeItems={placeholder}
            disabled={isSubmitting}
            {...register(name)}
            pr="4.5rem"
            type={show ? "text" : "password"}
          />
          <InputRightAddon width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightAddon>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </InputGroup>
        <Box color="red">{error}</Box>
      </FormControl>
    )
  }
)

export default InputPasswordField
