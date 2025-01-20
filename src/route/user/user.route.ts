import { prismaClient } from "../../config/client";
import { UserController } from "../../controller/user.controller";
import { validate } from "../../middleware/validate.middleware";
import { UserRepository } from "../../repository/user.repository";
import { UserService } from "../../service/user.service";
import { HttpRouter } from "../../utils/http";
import { createUserSchema } from "./user.validator";

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = HttpRouter();

userRouter.post("", validate(createUserSchema), userController.createUser);

export default userRouter;
