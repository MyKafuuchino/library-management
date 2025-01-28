import {Router} from "express";
import userRouter from "./user/user.route";
import authRouter from "./auth/auth.route";
import bookRouter from "./book/book.route";
import categoryRouter from "./category/category.route";

const apiRoute = Router();
const baseRoute = Router();

apiRoute.use("/api", baseRoute);

baseRoute.use("/users", userRouter);
baseRoute.use("/auth", authRouter);
baseRoute.use("/books", bookRouter);
baseRoute.use("/categories", categoryRouter);

export default apiRoute;
