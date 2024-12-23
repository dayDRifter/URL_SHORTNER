import express from "express";
import urlRouter from "./url.route.js";
import userRouter from "./user.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/url", urlRouter);
indexRouter.use("/api/v1/users", userRouter);

export { indexRouter };
