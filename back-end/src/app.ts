import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import recommendationRouter from "./routers/recommendationRouter";
import tests from "./routers/tests.Routes";

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "test") {
  app.use(tests);
}

app.use("/recommendations", recommendationRouter);
app.use(errorHandlerMiddleware);

export default app;
