import {CreateLoan, FindLoanById, UpdateLoan} from "../route/loan/loan.validator";
import {LoanRepository} from "../repository/loan.repository";
import {LoanResponse} from "../types/loan.types";
import {CustomError} from "../utils/custom_error";
import {BookRepository} from "../repository/book.repository";
import {UserRepository} from "../repository/user.repository";
import {FindBookById, UpdateBook} from "../route/book/book.validator";
import {FindUserById} from "../route/user/user.validator";

export interface LoanService {
  getAllLoans(): Promise<LoanResponse[]>;

  getLoanById(reqLoan: FindLoanById): Promise<LoanResponse>

  createLoan(reqLoan: CreateLoan): Promise<LoanResponse>

  // createLoans(reqLoans: CreateLoans): Promise<LoanResponse[]>

  updateLoan(reqLoan: UpdateLoan): Promise<LoanResponse>

  deleteLoan(reqLoan: FindLoanById): Promise<LoanResponse>
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

  public async getAllLoans(): Promise<LoanResponse[]> {
    return this.loanRepository.findAll()
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

    const totalLoanBook = await this.loanRepository.findByUserId(reqUser)

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

  // public async createLoans(reqLoans: CreateLoans): Promise<LoanResponse[]> {
  //   throw new Error("Method not implemented.");
  // }

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