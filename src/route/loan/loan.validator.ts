import {z} from "zod";
import {zodStringToNumber} from "../../utils/zod_string_to_number";

export const loanSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  returnDate: z.date(),
})

export const createLoanSchema = z.object({
  body: loanSchema,
})

export const createLoansSchema = z.object({
  body: z.array(loanSchema),
})

export const updateLoanSchema = z.object({
  body: loanSchema.partial(),
  params: z.object({
    id: zodStringToNumber,
  })
})

export const findLoanById = z.object({
  params: z.object({
    id: zodStringToNumber,
  })
})

export type CreateLoan = z.infer<typeof createLoanSchema>
export type CreateLoans = z.infer<typeof createLoansSchema>
export type UpdateLoan = z.infer<typeof updateLoanSchema>
export type FindLoanById = z.infer<typeof findLoanById>