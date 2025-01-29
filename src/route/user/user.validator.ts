import {Role} from "@prisma/client";
import {z} from "zod";
import {zodStringToNumber} from "../../utils/zod_string_to_number";

export const updateUserSchema = z.object({
  params: z.object({
    id: zodStringToNumber
  }),

  body: z.object({
    name: z.string().min(3, "Name must have at least 3 characters").optional(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
    phone: z
        .string()
        .min(6, "Phone number must be at least 6 characters")
        .optional(),
    role: z.nativeEnum(Role).optional(),
  }),
});

export const findUserById = z.object({
  params: z.object({
    id: z.preprocess(
        (value) => (typeof value === "string" ? parseInt(value, 10) : value),
        z.number().int()
    ),
  }),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type FindUserById = z.infer<typeof findUserById>;
