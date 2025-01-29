import {PrismaClient, User} from "@prisma/client";
import {FindUserById, UpdateUser} from "../route/user/user.validator";
import {BaseRepository} from "./utils/base.repository";
import {
  UserRegisterRequest,
  UserLoginRequest,
} from "../route/auth/auth.validator";

export interface UserRepository {
  findAll(): Promise<User[]>;

  create(reqUser: UserRegisterRequest): Promise<User>;

  findById(reqUser: FindUserById): Promise<User | null>;

  findByEmail(reqUser: UserLoginRequest): Promise<User | null>;

  update(reqUser: UpdateUser): Promise<User | null>;

  delete(reqUser: FindUserById): Promise<boolean>;
}

export class UserRepositoryImpl extends BaseRepository implements UserRepository {
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

  public findById(reqUser: FindUserById): Promise<User | null> {
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

  public async delete(reqUser: FindUserById): Promise<boolean> {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: reqUser.params.id,
      },
    });
    return Boolean(deleteUser);
  }
}
