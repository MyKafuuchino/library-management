import {PrismaClient, User} from "@prisma/client";
import {GetUserById, UpdateUser} from "../route/user/user.validator";
import {BaseRepository} from "./utils/base.repository";
import {
  UserRegisterRequest,
  UserLoginRequest,
} from "../route/auth/auth.validator";

export interface UserRepository {
  findAll(): Promise<User[]>;

  create(reqUser: UserRegisterRequest): Promise<User>;

  findById(reqUser: GetUserById): Promise<User | null>;

  findByEmail(reqUser: UserLoginRequest): Promise<User | null>;

  update(reqUser: UpdateUser): Promise<User | null>;

  delete(reqUser: GetUserById): Promise<boolean>;
}

export class UserRepository extends BaseRepository implements UserRepository {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  public async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async create(reqUser: UserRegisterRequest): Promise<User> {
    return this.prisma.user.create({
      data: reqUser.body,
    });
  }

  public findById(reqUser: GetUserById): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: reqUser.params.id,
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
        id: reqUser.params.id,
      },
      data: reqUser.body,
    });
  }

  public async delete(reqUser: GetUserById): Promise<boolean> {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: reqUser.params.id,
      },
    });
    return Boolean(deleteUser);
  }
}
