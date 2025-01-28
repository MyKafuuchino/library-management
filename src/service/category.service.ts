import {CategoryResponse} from "../types/category.types";
import {CreateCategory, FindCategoryById, UpdateCategory} from "../route/category/category.validator";
import {CategoryRepository} from "../repository/category.repository";
import {CustomError} from "../utils/custom_error";

export interface CategoryService {
  getAllCategory(): Promise<CategoryResponse[]>

  getCategoryById(reqCategory: FindCategoryById): Promise<CategoryResponse>

  create(reqCategory: CreateCategory): Promise<CategoryResponse>

  update(reqCategory: UpdateCategory): Promise<CategoryResponse>

  delete(reqCategory: FindCategoryById): Promise<CategoryResponse>
}

export class CategoryServiceImpl implements CategoryService {
  categoryRepository: CategoryRepository

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async getAllCategory(): Promise<CategoryResponse[]> {
    return this.categoryRepository.findMany()
  }

  public async getCategoryById(reqCategory: FindCategoryById): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(reqCategory)
    if (!category) {
      throw new CustomError("category not found", "NOT_FOUND")
    }
    return category
  }

  public async create(reqCategory: CreateCategory): Promise<CategoryResponse> {
    return this.categoryRepository.create(reqCategory)
  }

  public async update(reqCategory: UpdateCategory): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(reqCategory)
    if (!category) {
      throw new CustomError("category not found", "NOT_FOUND")
    }
    return this.categoryRepository.update(reqCategory)
  }

  public async delete(reqCategory: FindCategoryById): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(reqCategory)
    if (!category) {
      throw new CustomError("category not found", "NOT_FOUND")
    }
    await this.categoryRepository.delete(reqCategory)
    return category
  }
}