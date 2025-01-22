import { PrismaClient, User } from "@prisma/client";
import {
  CreateUser,
  GetUserById,
  UpdateUser,
  UserLogin,
} from "../route/user/user.validator";
import { BaseRepository } from "./utils/base.repository";
import {
  GetUsersResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserResponse,
} from "../types/user.types";

export class UserRepository extends BaseRepository {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  public async getUsers(): Promise<GetUsersResponse[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
      },
    });
  }

  public async createUser(reqUser: CreateUser): Promise<User> {
    return this.prisma.user.create({
      data: reqUser.body,
    });
  }

  public findUserById(reqUser: GetUserById): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: reqUser.params.userId,
      },
    });
  }

  public findUserByEmail(reqUser: UserLogin): Promise<UserLoginRequest | null> {
    return this.prisma.user.findFirst({
      where: {
        email: reqUser.body.email,
      },
      select: {
        email: true,
        password: true,
      },
    });
  }

  public updateUserById(reqUser: UpdateUser): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id: reqUser.params.userId,
      },
      data: reqUser.body,
    });
  }

  public async deleteUserById(reqUser: GetUserById): Promise<boolean> {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: reqUser.params.userId,
      },
    });
    return Boolean(deleteUser);
  }
}
