import express from "express";
import urlController from "../controllers/url.controllers.js";
import { checkIsLoggedIn } from "../middlewares/auth.middleware.js";
// import urlController from "../controllers/url.controllers.js";

const urlRouter = express.Router();

urlRouter.post("/shrink", checkIsLoggedIn, urlController.shrink); //urlRouter.post("/shrink",f1,f2,f3,urlController.shrink) if f1 send response then there might be an error but if it is not then it would could the next function f2 and this go on.

// urlRouter.route("/shrink").post(userController.shrink);
urlRouter.get("/redirect/:id", urlController.redirect);
urlRouter.get("/views/:id", checkIsLoggedIn, urlController.views);

export default urlRouter;
