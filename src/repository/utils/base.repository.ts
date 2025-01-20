import { PrismaClient } from "@prisma/client";

export class BaseRepository {
  protected prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
}
