import express from "express";
import routes from "../routes";
import passport from "passport";
import { getLogin, postLogin, logout, getJoin, postJoin, githubLogin, postGithubLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

// Git Oauth Login
globalRouter.get(routes.github, githubLogin); // 사용자는 github로 가게된다.

globalRouter.get(routes.githubCallback, // 사용자가 돌아오게 된다. 
  passport.authenticate('github', { failureRedirect: '/login' }),
  postGithubLogin
)
export default globalRouter;