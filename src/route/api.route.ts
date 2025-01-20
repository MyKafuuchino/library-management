import { Router } from "express";
import userRouter from "./user/user.route";

const apiRoute = Router();
const baseRoute = Router();

apiRoute.use("/api", baseRoute);

baseRoute.use("/users", userRouter);

export default apiRoute;
