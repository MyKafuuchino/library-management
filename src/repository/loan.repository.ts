import {Loan} from "@prisma/client";
import {
  CreateLoan,
  CreateLoans,
  FindLoanById,
  UpdateLoan,
} from "../route/loan/loan.validator";
import {BaseRepository} from "./utils/base.repository";

export interface LoanRepository {
  findAll(): Promise<Loan[]>;

  findById(reqLoan: FindLoanById): Promise<Loan | null>;

  create(reqLoan: CreateLoan): Promise<Loan>;

  createMany(reqLoans: CreateLoans): Promise<Loan[]>;

  update(reqLoan: UpdateLoan): Promise<Loan>;

  delete(reqLoan: FindLoanById): Promise<boolean>;
}

export class LoanRepositoryImpl extends BaseRepository implements LoanRepository {
  public async findAll(): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      orderBy: {
        borrowDate: "asc",
      },
    });
  }

  public async findById(reqLoan: FindLoanById): Promise<Loan | null> {
    return this.prisma.loan.findUnique({
      where: {
        id: reqLoan.params.id
      }
    })
  }

  public async create(reqLoan: CreateLoan): Promise<Loan> {
    return this.prisma.loan.create({
      data: reqLoan.body
    });
  }

  public async createMany(reqLoans: CreateLoans): Promise<Loan[]> {
    return Promise.all(reqLoans.body.map((loan) => this.prisma.loan.create({
      data: loan
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
