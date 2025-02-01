import {FindLoanById, CreateLoan, UpdateLoan, QueryLoan} from "../route/loan/loan.validator";
import {LoanService} from "../service/loan.service";
import {HttpNextFunction, HttpRequest, HttpResponse} from "../utils/http";
import {HTTP_STATUSES} from "../constant/http_status.constant";
import {NewResponseSuccess} from "../utils/http_response";
import {CustomError} from "../utils/custom_error";

export class LoanController {
  loanService: LoanService

  constructor(loanService: LoanService) {
    this.loanService = loanService;
  }


  getAllLoans = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const loanQuery: QueryLoan = {
        pagination: {
          limit: req.query.limit ? parseInt(req.query.limit as string) : 0,
          page: req.query.page ? parseInt(req.query.page as string) : 0,
        }
      }
      const {data, pagination} = await this.loanService.getAllLoans(loanQuery)
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Get All loans successfully", data, pagination.currentPage, pagination.totalPages, pagination.totalItems));
    } catch (error) {
      next(error)
    }
  }

  getLoanById = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const loanReq: FindLoanById = {
        params: {
          id: parseInt(req.params["id"]),
        }
      }

      const loanResponse = await this.loanService.getLoanById(loanReq);

      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Get Loan ById successfully", loanResponse));
    } catch (error) {
      next(error)
    }
  }

  createLoan = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const user = req.user;
      if (!user) {
        throw new CustomError("User is not authenticated", "UNAUTHORIZED");
      }
      const loanReq: CreateLoan = {
        userId: user.id,
        body: req.body,
      }

      const loanResponse = await this.loanService.createLoan(loanReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Create Loan Successfully", loanResponse));
    } catch (err) {
      next(err)
    }
  }

  updateLoan = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const user = req.user;
      if (!user) {
        throw new CustomError("User is not authenticated", "UNAUTHORIZED");
      }
      const loanReq: UpdateLoan = {
        userId: user.id,
        params: {
          id: parseInt(req.params["id"])
        },
        body: req.body
      }

      const loanResponse = await this.loanService.updateLoan(loanReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Update Loan Successfully", loanResponse));
    } catch (err) {
      next(err)
    }
  }

  deleteLoan = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const loanReq: FindLoanById = {
        params: {
          id: parseInt(req.params["id"]),
        }
      }
      const loanResponse = await this.loanService.deleteLoan(loanReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Delete Loan Successfully", loanResponse));
    } catch (err) {
      next(err)
    }

  }

  returnBook = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const loanReq: FindLoanById = {
        params: {
          id: parseInt(req.params["id"]),
        }
      }
      const loanResponse = await this.loanService.returnBook(loanReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Returned Book", loanResponse));
    } catch (err) {
      next(err)
    }
  }
}