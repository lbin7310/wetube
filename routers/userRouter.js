import express from "express";
import routes from "../routes";
import { userDetail, editProfile, changePassword, users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.post(routes.userDetail, userDetail);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;