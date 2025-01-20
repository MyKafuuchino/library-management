import { CreateUser } from "../route/user/user.validator";

export type CreateUserResponse = {
  name: string;
  email: string;
  phone: string;
};
