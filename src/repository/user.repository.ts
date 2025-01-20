import { PrismaClient, User } from "@prisma/client";
import { CreateUser } from "../route/user/user.validator";
import { BaseRepository } from "./utils/base.repository";

export class UserRepository extends BaseRepository {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  public async createUser(reqUserBody: CreateUser["body"]): Promise<User> {
    return this.prisma.user.create({
      data: reqUserBody,
    });
  }
}
