import {HttpRouter} from "../../utils/http";
import {CategoryRepositoryImpl} from "../../repository/category.repository";
import {prismaClient} from "../../config/client";
import {CategoryServiceImpl} from "../../service/category.service";
import {CategoryController} from "../../controller/category.controller";
import {validate} from "../../middleware/validate.middleware";
import {createCategorySchema, findCategoryByIdSchema, updateCategorySchema} from "./category.validator";
import {authorizeRoles} from "../../middleware/protect_route.by_role.middleware";
import {BookRepositoryImpl} from "../../repository/book.repository";

const categoryRouter = HttpRouter();

const categoryRepository = new CategoryRepositoryImpl(prismaClient);
const bookRepository = new BookRepositoryImpl(prismaClient);

const categoryService = new CategoryServiceImpl(categoryRepository, bookRepository);
const categoryController = new CategoryController(categoryService)

categoryRouter.get("", authorizeRoles(), categoryController.getAllCategories)
categoryRouter.get("/:id", validate(findCategoryByIdSchema), authorizeRoles(), categoryController.getCategoryById)
categoryRouter.post("", validate(createCategorySchema), authorizeRoles("MANAGER", "ADMIN"), categoryController.createCategory)
categoryRouter.put("/:id", validate(updateCategorySchema), authorizeRoles("MANAGER", "ADMIN"), categoryController.updateCategory)
categoryRouter.delete("/:id", validate(findCategoryByIdSchema), authorizeRoles("MANAGER", "ADMIN"), categoryController.deleteCategory)

categoryRouter.get("/:id/books", validate(findCategoryByIdSchema), categoryController.getAllBooksByCategory)
export default categoryRouter;