import { FormControl, Checkbox, Box, CheckboxProps as ChakraCheckboxProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"

export interface CheckboxProps extends ChakraCheckboxProps {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[props.name])
      ? errors[props.name].join(", ")
      : errors[props.name]?.message || errors[props.name]

    return (
      <FormControl>
        <Checkbox disabled={isSubmitting} {...register(props.name)} name={props.name}>
          {label}
        </Checkbox>
        <Box color="red">{error}</Box>
      </FormControl>
    )
  }
)

export default CheckboxField
