import * as z from "zod"

export const CreateProduct = z
  .object({
    name: z.string(),
    isImportant: z.boolean().optional(),
    isComplete: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  })
  .nonstrict()

export const UpdateProduct = z.object({
  id: z.number(),
  name: z.string(),
  isImportant: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
})

export const DeleteProduct = z
  .object({
    id: z.number(),
  })
  .nonstrict()
