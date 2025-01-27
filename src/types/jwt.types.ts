import jwt from "jsonwebtoken";
import {Role} from "@prisma/client";

export interface UserPayload extends jwt.JwtPayload {
  id: number;
  role: Role;
}
