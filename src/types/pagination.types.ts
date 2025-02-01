export interface PaginationResponse<T> {
  pagination: {
    currentPage: number,
    totalPages: number,
    totalItems: number,
  },
  data: T;
}