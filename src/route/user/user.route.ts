import {prismaClient} from "../../config/client";
import {UserController} from "../../controller/user.controller";
import {validate} from "../../middleware/validate.middleware";
import {UserRepositoryImpl} from "../../repository/userRepositoryImpl";
import {UserServiceImpl} from "../../service/userServiceImpl";
import {HttpRouter} from "../../utils/http";
import {getUserByIdSchema, updateUserSchema} from "./user.validator";
import {protectRouteByRole} from "../../middleware/protect_route.by_role.middleware";

const userRepository = new UserRepositoryImpl(prismaClient);
const userService = new UserServiceImpl(userRepository);
const userController = new UserController(userService);

const userRouter = HttpRouter();

userRouter.get("", protectRouteByRole("ADMIN"), userController.getUsers);
userRouter.get(
    "/:userId",
    validate(getUserByIdSchema),
    userController.getUserById
);
userRouter.put(
    "/:userId",
    protectRouteByRole("ADMIN"),
    validate(updateUserSchema),
    userController.updateUserById
);
userRouter.delete(
    "/:userId",
    protectRouteByRole("ADMIN"),
    validate(getUserByIdSchema),
    userController.deleteUserById
);

export default userRouter;
