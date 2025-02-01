import {Book} from "@prisma/client";
import {BaseRepository} from "./utils/base.repository";
import {CustomError} from "../utils/custom_error";
import {CreateBook, CreateBooks, FindBookById, SearchBookQuery, UpdateBook} from "../route/book/book.validator";
import {createSlug} from "../utils/createSlug";
import {FindCategoryById} from "../route/category/category.validator";
import {PaginationResponse} from "../types/pagination.types";

export interface BookRepository {
  findAll(bookQuery: SearchBookQuery): Promise<PaginationResponse<Book[]>>;

  findById(reqBook: FindBookById): Promise<Book>;

  createOne(reqBook: CreateBook): Promise<Book>;

  createMany(reqBook: CreateBooks): Promise<Book[]>;

  update(reqBook: UpdateBook): Promise<Book>;

  deleteOne(reqBook: FindBookById): Promise<boolean>;

  findAllByCategory(reqBook: FindCategoryById): Promise<Book[]>;
}

export class BookRepositoryImpl extends BaseRepository implements BookRepository {

  public async findAll(bookQuery: SearchBookQuery): Promise<PaginationResponse<Book[]>> {
    const {page, limit} = bookQuery.pagination
    const skip = (page - 1) * limit;
    const query = bookQuery.query;

    const [book, totalBook] = await Promise.all([
      this.prisma.book.findMany({
        where: {
          title: {
            contains: query.title
          },
          author: {
            contains: query.author
          },
        },
        skip: skip,
        take: limit,
        orderBy: {
          title: "asc"
        }
      }),
      this.prisma.book.count()
    ])

    const totalPages = Math.ceil(totalBook / limit);

    return {
      data: book,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalBook,
      },
    }
  }


  public async findById(reqBook: FindBookById): Promise<Book> {
    const book = await this.prisma.book.findFirst({where: {id: reqBook.params.id}});
    if (!book) {
      throw new CustomError("Book not found.", "NOT_FOUND");
    }
    return book;
  }

  public async createOne(reqBook: CreateBook): Promise<Book> {
    const slug = createSlug(reqBook.body.title);
    return this.prisma.book.create({
      data: {
        ...reqBook.body,
        slug,
      }
    })
  }

  public async createMany(reqBook: CreateBooks): Promise<Book[]> {
    return Promise.all(
        reqBook.body.map((book) =>
            this.prisma.book.create({
              data: {
                ...book,
                slug: createSlug(book.title),
              },
            })
        )
    );
  }

  public async update(reqBook: UpdateBook): Promise<Book> {
    return this.prisma.book.update({
      where: {id: reqBook.params.id},
      data: {
        ...reqBook.body,
        slug: reqBook.body.title ? createSlug(reqBook.body.title) : undefined,
      },
    });
  }

  public async deleteOne(reqBook: FindBookById): Promise<boolean> {
    await this.prisma.book.delete({where: {id: reqBook.params.id}});
    return true;
  }

  public async findAllByCategory(reqBook: FindCategoryById): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: {
        categoryId: reqBook.params.id
      },
      orderBy: {
        slug: 'asc'
      }
    });
  }
}