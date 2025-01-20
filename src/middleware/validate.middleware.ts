import { AnyZodObject } from "zod";
import { HttpNextFunction, HttpRequest, HttpResponse } from "../utils/http";

export const validate = (schema: AnyZodObject) => {
  return (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
