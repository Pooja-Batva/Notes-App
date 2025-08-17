import {Router} from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/index.js";
import {verifyJWT} from "../middlewares/index.js"

const userRouter = Router();


userRouter.route("/auth/register").post(registerUser);
userRouter.route("/auth/login").post(loginUser);
userRouter.route("/auth/logout").post(verifyJWT, logoutUser);

export default userRouter;