import {prismaClient} from "../../config/client";
import {UserController} from "../../controller/user.controller";
import {validate} from "../../middleware/validate.middleware";
import {UserRepositoryImpl} from "../../repository/user.repository";
import {UserServiceImpl} from "../../service/user.service";
import {HttpRouter} from "../../utils/http";
import {findUserById, updateUserSchema} from "./user.validator";
import {authorizeRoles} from "../../middleware/protect_route.by_role.middleware";

const userRepository = new UserRepositoryImpl(prismaClient);
const userService = new UserServiceImpl(userRepository);
const userController = new UserController(userService);

const userRouter = HttpRouter();

userRouter.get("", authorizeRoles("ADMIN"), userController.getUsers);
userRouter.get(
    "/:id",
    authorizeRoles("MANAGER", "ADMIN"),
    validate(findUserById),
    userController.getUserById
);
userRouter.put(
    "/:id",
    authorizeRoles("MANAGER", "ADMIN"),
    validate(updateUserSchema),
    userController.updateUserById
);
userRouter.delete(
    "/:id",
    authorizeRoles("MANAGER", "ADMIN"),
    validate(findUserById),
    userController.deleteUserById
);

export default userRouter;
