export interface LoanResponse {
  id: number
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate: Date | null;
  isReturned: boolean;
}

export interface ReturnBookResponse extends LoanResponse {
  penalty: number
}