type ResponseSuccess<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export function NewResponseSuccess<T>(
    message: string,
    data?: T
): ResponseSuccess<T> {
  return {
    success: true,
    message: message,
    data: data,
  };
}

type ResponseError = {
  success: boolean;
  message: string;
  errors?: any;
};

export function NewResponseError(
    message: string,
    errors?: any
): ResponseError {
  return {
    success: false,
    message,
    errors,
  };
}
