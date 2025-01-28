import {CategoryService} from "../service/category.service";
import {HttpNextFunction, HttpRequest, HttpResponse} from "../utils/http";
import {HTTP_STATUSES} from "../constant/http_status.constant";
import {NewResponseSuccess} from "../utils/http_response";
import {CreateCategory, FindCategoryById, UpdateCategory} from "../route/category/category.validator";

export class CategoryController {
  categoryService: CategoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  getAllCategories = async (_req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const categoriesResponse = await this.categoryService.getAllCategory()
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Get all categories successfully", categoriesResponse));
    } catch (err) {
      next(err)
    }
  }

  getCategoryById = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const categoryReq: FindCategoryById = {
        params: {
          id: parseInt(req.params["id"])
        }
      }
      const categoryResponse = await this.categoryService.getCategoryById(categoryReq)
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Get category by id successfully", categoryResponse));
    } catch (err) {
      next(err)
    }
  }

  createCategory = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const categoryReq: CreateCategory = {
        body: req.body,
      }
      const categoryResponse = await this.categoryService.create(categoryReq)
      res.status(HTTP_STATUSES.CREATED).json(NewResponseSuccess("Create category successfully", categoryResponse));
    } catch (err) {
      next(err)
    }
  }

  updateCategory = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const categoryReq: UpdateCategory = {
        params: {
          id: parseInt(req.params["id"])
        },
        body: req.body,
      }
      const categoryResponse = await this.categoryService.update(categoryReq)
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Update category successfully", categoryResponse));
    } catch (err) {
      next(err)
    }
  }

  deleteCategory = async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
    try {
      const categoryReq: FindCategoryById = {
        params: {
          id: parseInt(req.params["id"])
        }
      }
      const categoryResponse = await this.categoryService.delete(categoryReq)
      res.status(HTTP_STATUSES.OK).json(NewResponseSuccess("Delete category successfully", categoryResponse));
    } catch (err) {
      next(err)
    }
  }
}