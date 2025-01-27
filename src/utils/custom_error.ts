import {HTTP_STATUSES} from "../constant/http_status.constant";

export class CustomError extends Error {
  public errorCode: string;
  public statusCode: number;

  constructor(
      message: string,
      errorCode: string,
      statusCode: keyof typeof HTTP_STATUSES,
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = HTTP_STATUSES[statusCode];

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
