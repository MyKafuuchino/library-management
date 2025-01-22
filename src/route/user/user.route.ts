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
import { protectRouteByRole } from "../../middleware/protect_route.by_role.middleware";

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = HttpRouter();

userRouter.get("", protectRouteByRole("ADMIN"), userController.getUsers);
userRouter.get(
  "/:userId",
  validate(getUserByIdSchema),
  userController.getUserById,
);
userRouter.post(
  "",
  protectRouteByRole("ADMIN"),
  validate(createUserSchema),
  userController.createUser,
);
userRouter.put(
  "/:userId",
  protectRouteByRole("ADMIN"),
  validate(updateUserSchema),
  userController.updateUserById,
);
userRouter.delete(
  "/:userId",
  protectRouteByRole("ADMIN"),
  validate(getUserByIdSchema),
  userController.deleteUserById,
);

export default userRouter;
