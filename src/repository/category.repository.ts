import { Category } from "@prisma/client";
import {
  CreateCategory,
  FindCategoryById,
  UpdateCategory,
} from "../route/category/category.validator";
import { BaseRepository } from "./utils/base.repository";

export interface CategoryRepository {
  findMany(): Promise<Category[]>;

  findById(reqCategory: FindCategoryById): Promise<Category | null>;

  findByIds(reqCategory: FindCategoryById[]): Promise<Category[]>;

  create(reqCategory: CreateCategory): Promise<Category>;

  update(reqCategory: UpdateCategory): Promise<Category>;

  delete(reqCategory: FindCategoryById): Promise<boolean>;
}

export class CategoryRepositoryImpl
  extends BaseRepository
  implements CategoryRepository
{
  public async findMany(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  public async findById(
    reqCategory: FindCategoryById
  ): Promise<Category | null> {
    return await this.prisma.category.findFirst({
      where: {
        id: reqCategory.params.id,
      },
    });
  }

  public async findByIds(reqCategory: FindCategoryById[]): Promise<Category[]> {
    const ids = reqCategory.map((category) => category.params.id);
    return this.prisma.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  public async create(reqCategory: CreateCategory): Promise<Category> {
    return this.prisma.category.create({
      data: reqCategory.body,
    });
  }

  public async update(reqCategory: UpdateCategory): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id: reqCategory.params.id,
      },
      data: reqCategory.body,
    });
  }

  public async delete(reqCategory: FindCategoryById): Promise<boolean> {
    await this.prisma.category.delete({
      where: {
        id: reqCategory.params.id,
      },
    });
    return true;
  }
}
