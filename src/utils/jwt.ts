import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt_config";
import { UserPayload } from "../types/jwt.types";

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

export function verifyToken(token: string): UserPayload {
  return <UserPayload>jwt.verify(token, jwtConfig.secret);
}
