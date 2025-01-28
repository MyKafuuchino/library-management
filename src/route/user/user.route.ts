import {prismaClient} from "../../config/client";
import {UserController} from "../../controller/user.controller";
import {validate} from "../../middleware/validate.middleware";
import {UserRepository} from "../../repository/user.repository";
import {UserServiceImpl} from "../../service/user.service";
import {HttpRouter} from "../../utils/http";
import {getUserByIdSchema, updateUserSchema} from "./user.validator";
import {protectRouteByRole} from "../../middleware/protect_route.by_role.middleware";

const userRepository = new UserRepository(prismaClient);
const userService = new UserServiceImpl(userRepository);
const userController = new UserController(userService);

const userRouter = HttpRouter();

userRouter.get("", protectRouteByRole("ADMIN"), userController.getUsers);
userRouter.get(
    "/:id",
    validate(getUserByIdSchema),
    userController.getUserById
);
userRouter.put(
    "/:id",
    protectRouteByRole("ADMIN"),
    validate(updateUserSchema),
    userController.updateUserById
);
userRouter.delete(
    "/:id",
    protectRouteByRole("ADMIN"),
    validate(getUserByIdSchema),
    userController.deleteUserById
);

export default userRouter;
