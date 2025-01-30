import {UserRegisterRequest} from "../src/route/auth/auth.validator";
import {hashPassword} from "../src/utils/bcrypt";
import {prismaClient} from "../src/config/client";

async function main() {
  const hashedPassword = await hashPassword("admin")
  const admin: UserRegisterRequest = {
    body: {
      email: "admin@example.com",
      name: "admin",
      role: "ADMIN",
      phone: "6281230729945",
      password: hashedPassword,
    }
  }

  await prismaClient.user.create({
    data: admin.body
  })

  console.log(`Admin created successfully.`)
}

main().catch(console.error);