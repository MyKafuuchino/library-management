import {z} from "zod";
import {zodStringToNumber} from "../../utils/zod_string_to_number";

const categorySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
})

export const createCategorySchema = z.object({
  body: categorySchema,
})

export const findCategoryByIdSchema = z.object({
  params: z.object({
    id: zodStringToNumber,
  })
})

export const updateCategorySchema = z.object({
  body: categorySchema.partial(),
  params: z.object({
    id: zodStringToNumber
  }),
})

export type CreateCategory = z.infer<typeof createCategorySchema>
export type FindCategoryById = z.infer<typeof findCategoryByIdSchema>
export type UpdateCategory = z.infer<typeof updateCategorySchema>