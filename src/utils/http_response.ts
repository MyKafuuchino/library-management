type ResponseSuccess<T> = {
  success: boolean;
  message: string;
  currentPage?: number,
  totalPage?: number,
  totalItem?: number
  data?: T;
};

export function NewResponseSuccess<T>(
    message: string,
    data?: T,
    currentPage?: number,
    totalPage?: number,
    totalItem?: number,
): ResponseSuccess<T> {
  return {
    success: true,
    message: message,
    currentPage: currentPage,
    totalPage: totalPage,
    totalItem: totalItem,
    data: data,
  }
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
