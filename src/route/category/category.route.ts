import {HttpRouter} from "../../utils/http";
import {CategoryRepositoryImpl} from "../../repository/category.repository";
import {prismaClient} from "../../config/client";
import {CategoryServiceImpl} from "../../service/category.service";
import {CategoryController} from "../../controller/category.controller";
import {validate} from "../../middleware/validate.middleware";
import {createCategorySchema, findCategoryByIdSchema, updateCategorySchema} from "./category.validator";
import {protectRouteByRole} from "../../middleware/protect_route.by_role.middleware";
import {BookRepositoryImpl} from "../../repository/book.repository";

const categoryRouter = HttpRouter();

const categoryRepository = new CategoryRepositoryImpl(prismaClient);
const bookRepository = new BookRepositoryImpl(prismaClient);

const categoryService = new CategoryServiceImpl(categoryRepository, bookRepository);
const categoryController = new CategoryController(categoryService)

categoryRouter.get("", categoryController.getAllCategories)
categoryRouter.get("/:id", validate(findCategoryByIdSchema), categoryController.getCategoryById)
categoryRouter.post("", validate(createCategorySchema), protectRouteByRole("ADMIN"), categoryController.createCategory)
categoryRouter.put("/:id", validate(updateCategorySchema), protectRouteByRole("ADMIN"), categoryController.updateCategory)
categoryRouter.delete("/:id", validate(findCategoryByIdSchema), protectRouteByRole("ADMIN"), categoryController.deleteCategory)

categoryRouter.get("/:id/books", validate(findCategoryByIdSchema), categoryController.getAllBooksByCategory)
export default categoryRouter;