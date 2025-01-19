import { PrismaClient } from "@prisma/client";

export class userRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  static async createUser() {}
}
