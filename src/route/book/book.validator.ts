import {z} from "zod";
import {zodStringToNumber} from "../../utils/zod_string_to_number";

const bookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  stock: z.number(),
  categoryId: z.number()
});

export const createBookSchema = z.object({
  body: bookSchema,
})

export const createBooksSchema = z.object({
  body: z.array(bookSchema),
})

export const findBookByIdSchema = z.object({
  params: z.object({
    id: zodStringToNumber
  })
})

export const updateBookSchema = z.object({
  body: bookSchema.partial(),
  params: z.object({
    id: zodStringToNumber
  })
})

export type CreateBook = z.infer<typeof createBookSchema>
export type CreateBooks = z.infer<typeof createBooksSchema>
export type FindBookById = z.infer<typeof findBookByIdSchema>
export type UpdateBook = z.infer<typeof updateBookSchema>