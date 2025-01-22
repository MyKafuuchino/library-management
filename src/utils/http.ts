import { Request, Response, Router, NextFunction } from "express";
import { UserPayload } from "../types/jwt.types";

interface IGetUserAuthInfoRequest extends Request {
  user?: UserPayload;
}

export {
  IGetUserAuthInfoRequest as HttpRequest,
  Response as HttpResponse,
  Router as HttpRouter,
  NextFunction as HttpNextFunction,
};
