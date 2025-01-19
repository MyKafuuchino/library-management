import { prismaClient } from "../src/config/client";

async function main() {
  await prismaClient.role.createMany({
    data: [
      {
        name: "Admin",
        description: "Administrator with full access",
      },
      {
        name: "User",
        description: "Regular user with limited access",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prismaClient.$disconnect());
