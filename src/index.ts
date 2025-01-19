import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import apiRoute from "./route/api.route";
import { appConfig } from "./config/app.config";

dotenv.config();

const app: Express = express();
const host: string = appConfig.host;
const port: string = appConfig.port;

app.use(express.json());

app.use("/", apiRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});
