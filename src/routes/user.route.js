import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

// userRouter.post("/new", userRouter.register);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.post("/reset", userController.reset);
userRouter.patch("/forgot", userController.forgot);

export default userRouter;
