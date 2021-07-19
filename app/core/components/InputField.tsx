import {
  FormControl,
  Input,
  Box,
  InputProps as ChakraInputProps,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"

export interface InputProps extends ChakraInputProps {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  helperText?: string
  placeholder?: string
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, placeholder, helperText, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input name={name} placeItems={placeholder} disabled={isSubmitting} {...register(name)} />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Box color="red">{error}</Box>
      </FormControl>
    )
  }
)

export default InputField
