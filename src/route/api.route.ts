import {Router} from "express";
import userRouter from "./user/user.route";
import authRouter from "./auth/auth.route";
import bookRouter from "./book/book.route";
import categoryRouter from "./category/category.route";
import loanRouter from "./loan/loan.router";

const apiRoute = Router();
const baseRoute = Router();

apiRoute.use("/api", baseRoute);

baseRoute.use("/users", userRouter);
baseRoute.use("/auth", authRouter);
baseRoute.use("/books", bookRouter);
baseRoute.use("/categories", categoryRouter);
baseRoute.use("/loans", loanRouter);

export default apiRoute;
