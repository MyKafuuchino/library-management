import {prismaClient} from "../../config/client";
import {AuthController} from "../../controller/auth.controller";
import {validate} from "../../middleware/validate.middleware";
import {UserRepository} from "../../repository/user.repository";
import {AuthServiceImpl} from "../../service/auth.service";
import {HttpRouter} from "../../utils/http";
import {userLoginSchema, userRegisterSchema} from "./auth.validator";

const authRouter = HttpRouter();

const userRepository = new UserRepository(prismaClient);
const authService = new AuthServiceImpl(userRepository);
const authController = new AuthController(authService);

authRouter.post("/login", validate(userLoginSchema), authController.login);
authRouter.post("/register", validate(userRegisterSchema), authController.register);

export default authRouter;
