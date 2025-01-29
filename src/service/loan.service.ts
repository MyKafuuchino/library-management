import {Loan} from "@prisma/client";
import {CreateLoan, CreateLoans, FindLoanById, UpdateLoan} from "../route/loan/loan.validator";

export interface LoanService {
  getAllLoans(): Promise<Loan[]>;

  getLoanById(reqLoan: FindLoanById): Promise<Loan>

  createLoan(reqLoan: CreateLoan): Promise<Loan>

  createLoans(reqLoans: CreateLoans): Promise<Loan[]>

  updateLoan(reqLoan: UpdateLoan): Promise<Loan>

  deleteLoan(reqLoan: FindLoanById): Promise<Loan>
}

export class LoanServiceImpl implements LoanService {
  public async getAllLoans(): Promise<Loan[]> {
    throw new Error("Method not implemented.");
  }

  public async getLoanById(reqLoan: FindLoanById): Promise<Loan> {
    throw new Error("Method not implemented.");
  }

  public async createLoan(reqLoan: CreateLoan): Promise<Loan> {
    throw new Error("Method not implemented.");
  }

  public async createLoans(reqLoans: CreateLoans): Promise<Loan[]> {
    throw new Error("Method not implemented.");
  }

  public async updateLoan(reqLoan: UpdateLoan): Promise<Loan> {
    throw new Error("Method not implemented.");
  }

  public async deleteLoan(reqLoan: FindLoanById): Promise<Loan> {
    throw new Error("Method not implemented.");
  }

}