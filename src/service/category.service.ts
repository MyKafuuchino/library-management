import {CategoryResponse} from "../types/category.types";
import {CreateCategory, FindCategoryById, UpdateCategory} from "../route/category/category.validator";
import {CategoryRepository} from "../repository/category.repository";
import {CustomError} from "../utils/custom_error";
import {BookRepository} from "../repository/book.repository";
import {BookResponse} from "../types/book.types";

export interface CategoryService {
  getAllCategory(): Promise<CategoryResponse[]>

  getCategoryById(reqCategory: FindCategoryById): Promise<CategoryResponse>

  create(reqCategory: CreateCategory): Promise<CategoryResponse>

  update(reqCategory: UpdateCategory): Promise<CategoryResponse>

  delete(reqCategory: FindCategoryById): Promise<CategoryResponse>

  getAllBooksByCategory(reqCategory: FindCategoryById): Promise<BookResponse[]>
}

export class CategoryServiceImpl implements CategoryService {
  categoryRepository: CategoryRepository
  bookRepository: BookRepository

  constructor(categoryRepository: CategoryRepository, bookRepository: BookRepository) {
    this.categoryRepository = categoryRepository;
    this.bookRepository = bookRepository;
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

  public async getAllBooksByCategory(reqCategory: FindCategoryById): Promise<BookResponse[]> {
    const books = await this.bookRepository.findAllByCategory(reqCategory);

    if (books.length === 0) {
      throw new CustomError("Books not found with this category", "NOT_FOUND")
    }

    return books
  }
}