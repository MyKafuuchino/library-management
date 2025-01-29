import {z} from "zod";
import {zodStringToNumber} from "../../utils/zod_string_to_number";

export const loanSchema = z.object({
  bookId: z.number(),
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

export type CreateLoan = z.infer<typeof createLoanSchema> & { userId: number }
export type CreateLoans = z.infer<typeof createLoansSchema> & { userId: number }
export type UpdateLoan = z.infer<typeof updateLoanSchema> & { userId: number }
export type FindLoanById = z.infer<typeof findLoanById>