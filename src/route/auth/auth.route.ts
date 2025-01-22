import { prismaClient } from "../../config/client";
import { AuthController } from "../../controller/auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { UserRepository } from "../../repository/user.repository";
import { AuthService } from "../../service/auth.service";
import { HttpRouter } from "../../utils/http";
import { userLoginSchema } from "../user/user.validator";

const authRouter = HttpRouter();

const userRepository = new UserRepository(prismaClient);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/login", validate(userLoginSchema), authController.login);

export default authRouter;
