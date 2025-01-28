import {HttpRouter} from "../../utils/http";
import {BookRepositoryImpl} from "../../repository/book.repository";
import {prismaClient} from "../../config/client";
import {BookServiceImpl} from "../../service/book.service";
import {BookController} from "../../controller/book.controller";
import {validate} from "../../middleware/validate.middleware";
import {
  createBookSchema,
  createBooksSchema,
  findBookByIdSchema,
  updateBookSchema
} from "./book.validator";
import {CategoryRepositoryImpl} from "../../repository/category.repository";

const bookRouter = HttpRouter();

const bookRepo = new BookRepositoryImpl(prismaClient)
const categoryRepo = new CategoryRepositoryImpl(prismaClient)

const bookService = new BookServiceImpl(bookRepo, categoryRepo);
const bookController = new BookController(bookService);

bookRouter.get("", bookController.getAllBook)
bookRouter.get("/:id", validate(findBookByIdSchema), bookController.getBookById);
bookRouter.post("", validate(createBookSchema), bookController.createBook);
bookRouter.post("/many", validate(createBooksSchema), bookController.createBooks);
bookRouter.put("/:id", validate(updateBookSchema), bookController.updateBook);
bookRouter.delete("/:id", validate(findBookByIdSchema), bookController.deleteBook);

export default bookRouter