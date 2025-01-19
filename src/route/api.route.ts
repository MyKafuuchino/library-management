import { Router } from "express";

const apiRoute = Router();
const baseRoute = Router();

apiRoute.use("/api", baseRoute);

export default apiRoute;
