import { prismaClient } from "../../config/client";
import { UserController } from "../../controller/user.controller";
import { validate } from "../../middleware/validate.middleware";
import { UserRepository } from "../../repository/user.repository";
import { UserService } from "../../service/user.service";
import { HttpRouter } from "../../utils/http";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "./user.validator";

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = HttpRouter();

userRouter.get("", userController.getUsers);
userRouter.get(
  "/:userId",
  validate(getUserByIdSchema),
  userController.getUserById
);
userRouter.post("", validate(createUserSchema), userController.createUser);
userRouter.put(
  "/:userId",
  validate(updateUserSchema),
  userController.updateUserById
);
userRouter.delete(
  "/:userId",
  validate(getUserByIdSchema),
  userController.deleteUserById
);

export default userRouter;
