import express from "express";
import routes from "../routes";
import { userDetail, editProfile, changePassword, users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.home, users);
userRouter.post(routes.userDetail, userDetail);
userRouter.post(routes.editProfile, editProfile);
userRouter.post(routes.changePassword, changePassword);

export default userRouter;