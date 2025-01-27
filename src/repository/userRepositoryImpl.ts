import {PrismaClient, User} from "@prisma/client";
import {GetUserById, UpdateUser} from "../route/user/user.validator";
import {BaseRepository} from "./utils/base.repository";
import {GetUsersResponse} from "../types/user.types";
import {
  UserRegisterRequest,
  UserLoginRequest,
} from "../route/auth/auth.validator";

export interface UserRepository {
  findAll(): Promise<GetUsersResponse[]>;

  create(reqUser: UserRegisterRequest): Promise<User>;

  findById(reqUser: GetUserById): Promise<User | null>;

  findByEmail(reqUser: UserLoginRequest): Promise<User | null>;

  update(reqUser: UpdateUser): Promise<User | null>;

  delete(reqUser: GetUserById): Promise<boolean>;
}

export class UserRepositoryImpl extends BaseRepository implements UserRepository {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  public async findAll(): Promise<GetUsersResponse[]> {
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

  public async create(reqUser: UserRegisterRequest): Promise<User> {
    return this.prisma.user.create({
      data: reqUser.body,
    });
  }

  public findById(reqUser: GetUserById): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: reqUser.params.userId,
      },
    });
  }

  public findByEmail(reqUser: UserLoginRequest): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: reqUser.body.email,
      },
    });
  }

  public update(reqUser: UpdateUser): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id: reqUser.params.userId,
      },
      data: reqUser.body,
    });
  }

  public async delete(reqUser: GetUserById): Promise<boolean> {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: reqUser.params.userId,
      },
    });
    return Boolean(deleteUser);
  }
}
