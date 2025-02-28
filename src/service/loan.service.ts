import {CreateLoan, FindLoanById, QueryLoan, UpdateLoan} from "../route/loan/loan.validator";
import {LoanRepository} from "../repository/loan.repository";
import {LoanResponse, ReturnBookResponse} from "../types/loan.types";
import {CustomError} from "../utils/custom_error";
import {BookRepository} from "../repository/book.repository";
import {UserRepository} from "../repository/user.repository";
import {FindBookById, UpdateBook} from "../route/book/book.validator";
import {FindUserById} from "../route/user/user.validator";
import {PaginationResponse} from "../types/pagination.types";
import {Loan} from "@prisma/client";

export interface LoanService {
  getAllLoans(loanQuery: QueryLoan): Promise<PaginationResponse<Loan[]>>;

  getLoanById(reqLoan: FindLoanById): Promise<LoanResponse>

  createLoan(reqLoan: CreateLoan): Promise<LoanResponse>

  updateLoan(reqLoan: UpdateLoan): Promise<LoanResponse>

  deleteLoan(reqLoan: FindLoanById): Promise<LoanResponse>

  returnBook(reqLoan: FindLoanById): Promise<ReturnBookResponse>
}

export class LoanServiceImpl implements LoanService {
  loanRepository: LoanRepository
  bookRepository: BookRepository
  userRepository: UserRepository

  constructor(loanRepository: LoanRepository, bookRepository: BookRepository, userRepository: UserRepository) {
    this.loanRepository = loanRepository
    this.bookRepository = bookRepository
    this.userRepository = userRepository
  }

  public async returnBook(reqLoan: FindLoanById): Promise<ReturnBookResponse> {
    const existLoan = await this.loanRepository.findById(reqLoan)
    if (!existLoan) {
      throw new CustomError("Loan is not found", "NOT_FOUND")
    }
    const updateLoanData: UpdateLoan = {
      params: {
        id: existLoan.id
      },
      body: {
        isReturned: true,
      },
      userId: undefined
    }
    const data = await this.loanRepository.update(updateLoanData);

    const penalty = data.returnDate
        ? Math.max(0, (Math.floor((new Date(data.returnDate).getTime() - new Date(data.borrowDate).getTime()) / (1000 * 60 * 60 * 24)) - 7) * 3000)
        : 0;

    return {
      ...data,
      penalty
    };
  }

  public async getAllLoans(loanQuery: QueryLoan): Promise<PaginationResponse<Loan[]>> {
    return this.loanRepository.findAll(loanQuery)
  }

  public async getLoanById(reqLoan: FindLoanById): Promise<LoanResponse> {
    const existLoan = await this.loanRepository.findById(reqLoan)
    if (!existLoan) {
      throw new CustomError("Loan not exist", "NOT_FOUND")
    }
    return existLoan
  }

  public async createLoan(reqLoan: CreateLoan): Promise<LoanResponse> {
    const reqBook: FindBookById = {
      params: {
        id: reqLoan.body.bookId
      }
    }

    const reqUser: FindUserById = {
      params: {
        id: reqLoan.userId
      }
    }

    const existBook = await this.bookRepository.findById(reqBook)
    const existUser = await this.userRepository.findById(reqUser)

    if (!existBook || !existUser) {
      throw new CustomError(`Book ${reqBook.params.id} or User ${reqUser.params.id} does not exist`, "NOT_FOUND")
    }

    const totalLoanBook = await this.loanRepository.findByUserId(reqUser, false)

    if (totalLoanBook.length >= 3) {
      throw new CustomError("You have reached the maximum book borrowing limit (3 books).", "FORBIDDEN")
    }

    const updateBookData: UpdateBook = {
      params: {
        id: reqBook.params.id
      }, body: {
        stock: existBook.stock - 1
      }
    }

    const updateBook = await this.bookRepository.update(updateBookData)

    if (updateBook.stock < 0) {
      throw new CustomError("Book stock has run out", "FORBIDDEN");
    }

    return this.loanRepository.create(reqLoan)
  }

  public async updateLoan(reqLoan: UpdateLoan): Promise<LoanResponse> {

    if (reqLoan.body.bookId) {
      const existBook = await this.bookRepository.findById({params: {id: reqLoan.body.bookId}});
      if (!existBook) {
        throw new CustomError(`Book ${reqLoan.body.bookId} does not exist`, "NOT_FOUND");
      }
    }

    if (reqLoan.userId) {
      const existUser = await this.userRepository.findById({params: {id: reqLoan.userId}});
      if (!existUser) {
        throw new CustomError(`User ${reqLoan.userId} does not exist`, "NOT_FOUND");
      }
    }

    return this.loanRepository.update(reqLoan);
  }

  public async deleteLoan(reqLoan: FindLoanById): Promise<LoanResponse> {
    const loanExist = await this.loanRepository.findById(reqLoan)
    if (!loanExist) {
      throw new CustomError("Loan not found.", "NOT_FOUND");
    }
    await this.loanRepository.delete(reqLoan)
    return loanExist
  }


}