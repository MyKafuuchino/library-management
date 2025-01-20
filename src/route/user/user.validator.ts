import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.nativeEnum(Role).optional(),
    phone: z.string().min(6, "Phone number must be at least 6 characters"),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.number(),
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
  }),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
