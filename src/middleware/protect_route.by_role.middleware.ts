import {Role} from "@prisma/client";
import {HttpNextFunction, HttpRequest, HttpResponse} from "../utils/http";
import {CustomError} from "../utils/custom_error";
import {verifyToken} from "../utils/jwt";

export function authorizeRoles(...roles: (keyof typeof Role)[]) {
  return (req: HttpRequest, _res: HttpResponse, next: HttpNextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("Access denied, no token provided", "FORBIDDEN");
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);

    if (!user || Date.now() >= (user.exp || 0) * 1000) {
      throw new CustomError("Access denied, token expired", "FORBIDDEN");
    }

    if (roles.length === 0) {
      req.user = user;
      return next();
    }

    if (!roles.includes(user.role as keyof typeof Role)) {
      throw new CustomError("Denied user role", "FORBIDDEN");
    }

    req.user = user;
    next();
  };
}
