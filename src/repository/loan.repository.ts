import {Loan} from "@prisma/client";
import {
  CreateLoan,
  CreateLoans,
  FindLoanById,
  UpdateLoan,
} from "../route/loan/loan.validator";
import {BaseRepository} from "./utils/base.repository";
import {FindUserById} from "../route/user/user.validator";

export interface LoanRepository {
  findAll(): Promise<Loan[]>;

  findById(reqLoan: FindLoanById): Promise<Loan | null>;

  create(reqLoan: CreateLoan): Promise<Loan>;

  createMany(reqLoans: CreateLoans): Promise<Loan[]>;

  update(reqLoan: UpdateLoan): Promise<Loan>;

  delete(reqLoan: FindLoanById): Promise<boolean>;

  findByUserId(reqLoan: FindUserById): Promise<Loan[]>;
}

export class LoanRepositoryImpl extends BaseRepository implements LoanRepository {
  public async findByUserId(reqLoan: FindUserById): Promise<Loan[]> {
    return await this.prisma.loan.findMany({
      where: {
        userId: reqLoan.params.id
      }
    })
  }

  public async findAll(): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      orderBy: {
        borrowDate: "asc",
      },
    });
  }

  public async findById(reqLoan: FindLoanById): Promise<Loan | null> {
    return this.prisma.loan.findFirst({
      where: {
        id: reqLoan.params.id
      }
    })
  }

  public async create(reqLoan: CreateLoan): Promise<Loan> {
    const createdAt = new Date();
    const returnDate = new Date(createdAt);

    returnDate.setDate(returnDate.getDate() + 7);

    return this.prisma.loan.create({
      data: {
        bookId: reqLoan.body.bookId,
        userId: reqLoan.userId,
        borrowDate: createdAt,
        returnDate: returnDate
      }
    });
  }

  public async createMany(reqLoans: CreateLoans): Promise<Loan[]> {
    const createdAt = new Date();
    const returnDate = new Date(createdAt);

    returnDate.setDate(returnDate.getDate() + 7);

    return Promise.all(reqLoans.body.map((loan) => this.prisma.loan.create({
      data: {
        bookId: loan.bookId,
        userId: reqLoans.userId,
        borrowDate: createdAt,
        returnDate: returnDate
      }
    })));
  }

  public async update(reqLoan: UpdateLoan): Promise<Loan> {
    return this.prisma.loan.update({
      where: {id: reqLoan.params.id},
      data: reqLoan.body
    })
  }

  public async delete(reqLoan: FindLoanById): Promise<boolean> {
    await this.prisma.loan.delete({
      where: {
        id: reqLoan.params.id
      }
    })
    return true
  }
}
