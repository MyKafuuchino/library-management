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
import {authorizeRoles} from "../../middleware/protect_route.by_role.middleware";

const bookRouter = HttpRouter();

const bookRepo = new BookRepositoryImpl(prismaClient)
const categoryRepo = new CategoryRepositoryImpl(prismaClient)

const bookService = new BookServiceImpl(bookRepo, categoryRepo);
const bookController = new BookController(bookService);

bookRouter.get("", authorizeRoles(), bookController.getAllBook)
bookRouter.get("/:id", validate(findBookByIdSchema), authorizeRoles(), bookController.getBookById);
bookRouter.post("", validate(createBookSchema), authorizeRoles("MANAGER", "ADMIN"), bookController.createBook);
bookRouter.post("/many", validate(createBooksSchema), authorizeRoles("MANAGER", "ADMIN"), bookController.createBooks);
bookRouter.put("/:id", validate(updateBookSchema), authorizeRoles("MANAGER", "ADMIN"), bookController.updateBook);
bookRouter.delete("/:id", validate(findBookByIdSchema), authorizeRoles("MANAGER", "ADMIN"), bookController.deleteBook);

export default bookRouter