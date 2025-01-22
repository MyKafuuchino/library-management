import { Role } from "@prisma/client";

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
};

export type CreateUserResponse = UserResponse;

export type UpdateUserResponse = UserResponse;

export type GetUsersResponse = UserResponse;

export type GetUserByIdResponse = UserResponse | null;

export type UserLoginRequest = {
  id: number;
  email: string;
  role: Role;
  password: string;
};

export type UserLoginResponse = {
  email: string;
  token: string;
};
