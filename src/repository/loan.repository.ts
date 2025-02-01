import {Loan} from "@prisma/client";
import {
  CreateLoan,
  CreateLoans,
  FindLoanById, QueryLoan,
  UpdateLoan,
} from "../route/loan/loan.validator";
import {BaseRepository} from "./utils/base.repository";
import {FindUserById} from "../route/user/user.validator";
import {PaginationResponse} from "../types/pagination.types";

export interface LoanRepository {
  findAll(loanQuery: QueryLoan): Promise<PaginationResponse<Loan[]>>;

  findById(reqLoan: FindLoanById): Promise<Loan | null>;

  create(reqLoan: CreateLoan): Promise<Loan>;

  createMany(reqLoans: CreateLoans): Promise<Loan[]>;

  update(reqLoan: UpdateLoan): Promise<Loan>;

  delete(reqLoan: FindLoanById): Promise<boolean>;

  findByUserId(reqLoan: FindUserById, isReturned?: boolean | undefined): Promise<Loan[]>;
}

export class LoanRepositoryImpl extends BaseRepository implements LoanRepository {
  public async findByUserId(reqLoan: FindUserById, isReturned?: boolean | undefined): Promise<Loan[]> {
    return await this.prisma.loan.findMany({
      where: {
        isReturned: isReturned,
        userId: reqLoan.params.id
      },
    })
  }

  public async findAll(loanQuery: QueryLoan): Promise<PaginationResponse<Loan[]>> {
    const {limit, page} = loanQuery.pagination
    const skip = (page - 1) * limit;
    const [data, totalLoan] = await Promise.all([
      this.prisma.loan.findMany({
        orderBy: {
          borrowDate: "asc",
        },
        skip,
        take: limit,
      }),
      this.prisma.loan.count()
    ])
    const totalPages = Math.ceil(totalLoan / limit);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalLoan
      }
    }
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
