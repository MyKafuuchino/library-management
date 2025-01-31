import jwt, {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import {jwtConfig} from "../config/jwt_config";
import {UserPayload} from "../types/jwt.types";
import {CustomError} from "./custom_error";

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

export function verifyToken(token: string): UserPayload {
  try {
    return jwt.verify(token, jwtConfig.secret) as UserPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new CustomError("Token has expired", "FORBIDDEN");
    } else if (error instanceof JsonWebTokenError) {
      throw new CustomError("Invalid token", "FORBIDDEN");
    } else {
      throw new CustomError("Token verification failed", "FORBIDDEN");
    }
  }
}
