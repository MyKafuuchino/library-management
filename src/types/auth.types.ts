import {UserResponse} from "./user.types";

export type UserLoginResponse = {
  email: string;
  token: string;
};

export type UserRegisterResponse = UserResponse;
