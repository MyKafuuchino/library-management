import {ZodError} from "zod";
import {CustomError} from "../utils/custom_error";
import {HttpRequest, HttpResponse, HttpNextFunction} from "../utils/http";
import {NewResponseError} from "../utils/http_response";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const errorHandler = (
    err: any,
    _req: HttpRequest,
    res: HttpResponse,
    _next: HttpNextFunction
) => {
  if (err instanceof CustomError) {
    res
        .status(err.statusCode)
        .json(NewResponseError(err.message));
  } else if (err instanceof ZodError) {
    const validationErrors = err.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));
    res
        .status(400)
        .json(
            NewResponseError(
                "Validation Error",
                validationErrors
            )
        );
  } else if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = err.meta?.target;
      res
          .status(409)
          .json(
              NewResponseError(
                  `A record with the same value for the field(s) [${target}] already exists.`,
                  "UNIQUE_CONSTRAINT_VIOLATION"
              )
          );
    }
  } else {
    console.log(err);
    res
        .status(500)
        .json(NewResponseError("Internal Server Error", "INTERNAL_SERVER_ERROR"));
  }
};

export default errorHandler;
