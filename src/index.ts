import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import apiRoute from "./route/api.route";

dotenv.config();

const app: Express = express();
const port: string = process.env.APP_PORT || "8080";

app.use(express.json());

app.use("/", apiRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
