import {BookService} from "../service/book.service";
import {HttpNextFunction, HttpRequest, HttpResponse} from "../utils/http";
import {HTTP_STATUSES} from "../constant/http_status.constant";
import {CreateBook, CreateBooks, FindBookById, SearchBookQuery, UpdateBook} from "../route/book/book.validator";
import {NewResponseSuccess} from "../utils/http_response";

export class BookController {
  bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public getAllBook = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const bookQuery: SearchBookQuery = {
        query: {
          title: req.query.title ? req.query.title as string : "",
          author: req.query.author ? req.query.author as string : "",
        },
        pagination: {
          limit: req.query.limit ? parseInt(req.query.limit as string) : 0,
          page: req.query.page ? parseInt(req.query.page as string) : 0,
        }
      }
      const {pagination, data} = await this.bookService.getAllBooks(bookQuery);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Get all books successfully.", data, pagination.currentPage, pagination.totalPages, pagination.totalItems));
    } catch (err) {
      next(err)
    }
  }

  public getBookById = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction): Promise<void> => {
    try {
      const bookReq: FindBookById = {
        params: {
          id: parseInt(req.params["id"])
        }
      }
      const bookResponse = await this.bookService.getBookById(bookReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Get book successfully.", bookResponse));
    } catch (err) {
      next(err)
    }
  }

  public createBook = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const bookReq: CreateBook = {
        body: req.body
      }
      const bookResponse = await this.bookService.createBook(bookReq);
      res.status(HTTP_STATUSES.CREATED).json(NewResponseSuccess("Create book successfully.", bookResponse));
    } catch (err) {
      next(err)
    }
  }

  public createBooks = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const bookReq: CreateBooks = {
        body: req.body
      }
      const bookResponse = await this.bookService.createBooks(bookReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Create books successfully.", bookResponse));
    } catch (err) {
      next(err)
    }
  }

  public updateBook = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const bookReq: UpdateBook = {
        params: {
          id: parseInt(req.params["id"])
        },
        body: req.body
      }

      const bookResponse = await this.bookService.updateBook(bookReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Update book successfully.", bookResponse));
    } catch (err) {
      next(err)
    }
  }

  public deleteBook = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const bookReq: FindBookById = {
        params: {
          id: parseInt(req.params["id"])
        }
      }
      const bookResponse = await this.bookService.deleteBook(bookReq);
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Delete successfully.", bookResponse));
    } catch (err) {
      next(err)
    }
  }
}