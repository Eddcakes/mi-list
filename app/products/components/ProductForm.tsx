import * as z from "zod"

import { Form, FormProps } from "app/core/components/Form"
import CheckboxField from "app/core/components/CheckboxField"
import InputField from "app/core/components/InputField"
export { FORM_ERROR } from "app/core/components/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <InputField name="name" label="Name" placeholder="Name" />
      <CheckboxField name="isComplete" label="Complete?" />
    </Form>
  )
}
