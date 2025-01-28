import { Role } from "@prisma/client";
import { z } from "zod";

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must have at least 6 character"),
  }),
});

export const userRegisterSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.nativeEnum(Role).optional(),
    phone: z.string().min(6, "Phone number must be at least 6 characters"),
  }),
});

export type UserRegisterRequest = z.infer<typeof userRegisterSchema>;
export type UserLoginRequest = z.infer<typeof userLoginSchema>;
