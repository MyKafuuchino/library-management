import dotenv from "dotenv";
import express, {Express} from "express";
import apiRoute from "./route/api.route";
import {appConfig} from "./config/app.config";
import errorHandler from "./middleware/error_handler.middleware";
import multer from "multer"

dotenv.config();

const app: Express = express();
const host: string = appConfig.host;
const port: string = appConfig.port;
const formDataParser = multer().none();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(formDataParser)

app.use("/", apiRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});
