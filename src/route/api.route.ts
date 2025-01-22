import { Router } from "express";
import userRouter from "./user/user.route";
import authRouter from "./auth/auth.route";

const apiRoute = Router();
const baseRoute = Router();

apiRoute.use("/api", baseRoute);

baseRoute.use("/users", userRouter);
baseRoute.use("/auth", authRouter);

export default apiRoute;
