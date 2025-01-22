import { COMMON_ERROR_CODES, ERROR_STATUSES } from "../constant/error.constant";

export class CustomError extends Error {
  public errorCode: string;
  public statusCode: number;

  constructor(
    message: string,
    errorCode: string,
    statusCode: keyof typeof ERROR_STATUSES,
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = ERROR_STATUSES[statusCode];

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
