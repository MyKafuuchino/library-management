import {HTTP_STATUSES} from "../constant/http_status.constant";

export class CustomError extends Error {
  public statusCode: number;

  constructor(
      message: string,
      statusCode: keyof typeof HTTP_STATUSES,
  ) {
    super(message);
    this.statusCode = HTTP_STATUSES[statusCode];

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
