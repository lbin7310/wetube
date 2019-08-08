import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug")
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CokieStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize());
app.use(passport.session());

// local middleware를 통해서 global 변수를 접근한다.
app.use(localMiddleware)

app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter)
app.use(routes.home, globalRouter);
app.use(routes.api, apiRouter);

export default app;