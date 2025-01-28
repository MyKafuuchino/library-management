import {CreateBook, CreateBooks, FindBookById, UpdateBook} from "../route/book/book.validator";
import {BookResponse} from "../types/book.types";
import {BookRepository} from "../repository/book.repository";
import {CategoryRepository} from "../repository/category.repository";
import {FindCategoryById} from "../route/category/category.validator";
import {CustomError} from "../utils/custom_error";

export interface BookService {
  getAllBooks(): Promise<BookResponse[]>;

  getBookById(reqBook: FindBookById): Promise<BookResponse>;

  createBook(reqBook: CreateBook): Promise<BookResponse>;

  createBooks(reqBook: CreateBooks): Promise<BookResponse[]>;

  updateBook(reqBook: UpdateBook): Promise<BookResponse>;

  deleteBook(reqBook: FindBookById): Promise<BookResponse>;
}

export class BookServiceImpl implements BookService {

  private categoryRepository: CategoryRepository;
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository, categoryRepository: CategoryRepository) {
    this.bookRepository = bookRepository;
    this.categoryRepository = categoryRepository;
  }

  public async getAllBooks(): Promise<BookResponse[]> {
    return this.bookRepository.findAll()
  }

  public async getBookById(reqBook: FindBookById): Promise<BookResponse> {
    return this.bookRepository.findById(reqBook);
  }

  public async createBook(reqBook: CreateBook): Promise<BookResponse> {
    const reqCategory: FindCategoryById = {
      params: {
        id: reqBook.body.categoryId,
      }
    }

    const isCategory = await this.categoryRepository.findById(reqCategory)
    if (!isCategory) {
      throw new CustomError("Category not found", "NOT_FOUND")
    }

    return this.bookRepository.createOne(reqBook)
  }

  public async createBooks(reqBooks: CreateBooks): Promise<BookResponse[]> {
    const categoryIds = [...new Set(reqBooks.body.map(book => book.categoryId))];
    const categoriesForValidation = categoryIds.map(id => ({params: {id}}));

    const existingCategories = await this.categoryRepository.findByIds(categoriesForValidation);

    if (existingCategories.length !== categoryIds.length) {
      throw new CustomError("Some categories not found", "NOT_FOUND");
    }

    return this.bookRepository.createMany(reqBooks);
  }


  public async updateBook(reqBook: UpdateBook): Promise<BookResponse> {
    if (reqBook.body.categoryId) {
      const reqCategory: FindCategoryById = {
        params: {
          id: reqBook.body.categoryId,
        }
      }
      const existingCategory = await this.categoryRepository.findById(reqCategory)
      if (!existingCategory) {
        throw new CustomError("Category not found", "NOT_FOUND");
      }
    }

    const existingBook = await this.bookRepository.findById(reqBook);
    if (!existingBook) {
      throw new CustomError("Book not found", "NOT_FOUND");
    }
    return this.bookRepository.update(reqBook)
  }

  public async deleteBook(reqBook: FindBookById): Promise<BookResponse> {
    const bookResponse = await this.bookRepository.findById(reqBook);
    await this.bookRepository.deleteOne(reqBook);
    return bookResponse
  }
}